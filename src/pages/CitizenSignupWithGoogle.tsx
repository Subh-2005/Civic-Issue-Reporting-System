import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowLeft, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GoogleLoginButton } from "@/components/GoogleLoginButton";

const CitizenSignupWithGoogle = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ---------------- HANDLE SIGNUP ---------------- //
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1️⃣ Check if the email already exists as an admin
      const { data: profile, error: fetchError } = await supabase
        .from("profiles")
        .select("role")
        .eq("email", formData.email)
        .maybeSingle();

      if (fetchError) throw new Error("Error checking account");

      if (profile?.role === "admin") {
        setError("This email is already registered as an admin.");
        setLoading(false);
        return;
      }

      // 2️⃣ Create Supabase user
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

      if (signUpError) throw signUpError;

      const user = signUpData.user;
      if (user) {
        // 3️⃣ Create profile entry
        const { error: profileError } = await supabase.from("profiles").insert({
          id: user.id,
          name: formData.name,
          email: formData.email,
          role: "citizen",
        });

        if (profileError) throw profileError;

        // 4️⃣ Auto login
        const { error: signInError } =
          await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          });

        if (signInError) {
          setError(
            "Signup successful, but auto-login failed. Please log in manually."
          );
          navigate("/login");
        } else {
          navigate("/account");
        }
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- HANDLE GOOGLE LOGIN ---------------- //
  const handleGoogleSuccess = () => {
    console.log("Google OAuth initiated successfully");
    // Supabase OAuth redirect will handle login
  };

  const handleGoogleError = (error: string) => {
    setError(error);
  };

  // ---------------- JSX ---------------- //
  return (
    <div className="min-h-screen bg-white text-black dark:bg-dark-blue-gradient dark:text-white">
      <Header />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
          <Card className="glass-effect border-0 shadow-[var(--shadow-elevated)]">
            <CardHeader className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Citizen Signup</CardTitle>
              <CardDescription>Create your citizen account</CardDescription>
            </CardHeader>

            <CardContent>
              {/* Google OAuth Button */}
              <div className="mb-6">
                <GoogleLoginButton
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                >
                  Sign up with Google
                </GoogleLoginButton>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required
                />

                {error && (
                  <div className="text-red-600 text-sm text-center p-2 bg-red-50 rounded">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="btn-framer-primary w-full"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => navigate("/login")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CitizenSignupWithGoogle;
