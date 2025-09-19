import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadCloud } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  notifications: z.boolean(),
  bio: z.string().max(160).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const SettingsPage: React.FC = () => {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const watchedName = watch("name");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

        const user = data?.user;
        if (user) {
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("name, email, notifications, profile_photo, bio")
            .eq("id", user.id)
            .maybeSingle();

          if (profileError) throw profileError;

          if (profileData) {
            setValue("name", profileData.name || "");
            setValue("notifications", profileData.notifications ?? true);
            setProfilePhotoUrl(profileData.profile_photo || "");
            setValue("bio", profileData.bio || "");
          } else {
            // If no profile exists, use email from auth
            const displayName = user.email?.split('@')[0] || "";
            setValue("name", displayName);
            setValue("notifications", true);
            setProfilePhotoUrl("");
            setValue("bio", "");
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast({
          title: "Error",
          description: "Failed to load profile data. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchProfile();
  }, [setValue, toast]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  const uploadPhoto = async (file: File, userId: string) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}.${fileExt}`;

      // Try to upload to avatars bucket
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });

      if (error) {
        // If avatars bucket doesn't exist, try a more generic approach
        console.warn("Avatars bucket not found, skipping photo upload:", error.message);
        return ""; // Return empty string to indicate no photo was uploaded
      }

      const { data: publicUrl } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);
      return publicUrl.publicUrl;
    } catch (err) {
      console.warn("Photo upload failed:", err);
      return ""; // Return empty string on error
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    setSaving(true);
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const user = userData?.user;
      if (!user) {
        toast({
          title: "Error",
          description: "No user found. Please log in again.",
          variant: "destructive",
        });
        setSaving(false);
        return;
      }

      let photoUrl = profilePhotoUrl;
      if (profilePhoto) {
        photoUrl = await uploadPhoto(profilePhoto, user.id);
        setProfilePhotoUrl(photoUrl);
        setProfilePhoto(null);
      }

      // Use upsert with proper conflict resolution
      const { error: upsertError } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          name: data.name,
          email: user.email,
          notifications: data.notifications,
          bio: data.bio || null,
          profile_photo: photoUrl || null,
          role: "citizen"
        });

      if (upsertError) {
        console.error("Upsert error details:", upsertError);
        throw upsertError;
      }

      const successMessage = photoUrl
        ? "Profile updated successfully!"
        : "Profile updated successfully! (Photo upload skipped - storage bucket not configured)";

      toast({
        title: "Success",
        description: successMessage,
      });
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : "Unknown error";
      toast({
        title: "Error",
        description: `Failed to update profile: ${message}`,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 via-white to-gray-200 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">⚙️ Settings</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              {...register("name")}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className="text-red-600 mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Notifications */}
          <div className="flex items-center space-x-3">
            <Switch
              id="notifications"
              checked={Boolean(watch("notifications"))}
              onCheckedChange={(checked) => setValue("notifications", checked)}
            />
            <Label htmlFor="notifications" className="mb-0">
              Enable Notifications
            </Label>
          </div>

          {/* Profile Photo */}
          <div>
            <Label>Profile Photo</Label>
            <div className="flex items-center space-x-4">
              <Avatar>
                {profilePhotoUrl ? (
                  <AvatarImage src={profilePhotoUrl} alt="Profile" />
                ) : (
                  <AvatarFallback>
                    {(watchedName || "User")[0]}
                  </AvatarFallback>
                )}
              </Avatar>
              <Button
                variant="outline"
                onClick={() => document.getElementById("photo-upload")?.click()}
              >
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload Photo
              </Button>
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself"
              {...register("bio")}
              rows={4}
            />
            {errors.bio && (
              <p className="text-red-600 mt-1 text-sm">{errors.bio.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
