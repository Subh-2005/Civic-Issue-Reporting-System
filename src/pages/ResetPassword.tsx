import React, { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { requestOtp, verifyOtp } from "@/lib/otpApi";

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  // Step 1: Request OTP (via backend)
  const handleSendOtp = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    setPreviewUrl("");
    const res = await requestOtp(identifier, isPhone);
    if (res.error) {
      setError(res.error);
    } else {
      setStep(2);
      setSuccess(isPhone ? "OTP sent to your phone." : "OTP sent to your email. Please check your inbox.");
      if (res.previewUrl) setPreviewUrl(res.previewUrl);
    }
    setLoading(false);
  };

  // Step 2: Verify OTP and set new password
  const handleResetPassword = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    // Step 1: Verify OTP via backend
    const res = await verifyOtp(identifier, otp);
    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }
    // Step 2: Update password in Supabase
    const { error: pwError } = await supabase.auth.updateUser({ password: newPassword });
    if (pwError) {
      setError(pwError.message);
    } else {
      setSuccess("Password reset successful. You can now log in.");
      setStep(3);
    }
    setLoading(false);
  };

  return (
  <div className="min-h-screen bg-white text-black dark:bg-dark-blue-gradient dark:text-white">
      <Header />
      <main className="pt-20 pb-12 flex items-center justify-center">
        <Card className="max-w-md w-full glass-effect">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <form
                onSubmit={e => { e.preventDefault(); handleSendOtp(); }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Input
                    type={isPhone ? "tel" : "email"}
                    placeholder={isPhone ? "Enter your phone number" : "Enter your email"}
                    value={identifier}
                    onChange={e => setIdentifier(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isPhone}
                      onChange={e => setIsPhone(e.target.checked)}
                      id="isPhone"
                      disabled={loading}
                    />
                    <label htmlFor="isPhone" className="text-sm">Use phone instead of email</label>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
                {error && <div className="text-red-600 text-sm">{error}</div>}
                {success && <div className="text-green-600 text-sm">{success}</div>}
                {previewUrl && (
                  <div className="mt-2 text-sm text-blue-600">
                    <a href={previewUrl} target="_blank" rel="noopener noreferrer">
                      View OTP Email (Ethereal)
                    </a>
                  </div>
                )}
              </form>
            )}
            {step === 2 && (
              <form
                onSubmit={e => { e.preventDefault(); handleResetPassword(); }}
                className="space-y-6"
              >
                <Input
                  type="text"
                  placeholder="Enter OTP from email"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                  disabled={loading}
                />
                <Input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
                {error && <div className="text-red-600 text-sm">{error}</div>}
                {success && <div className="text-green-600 text-sm">{success}</div>}
              </form>
            )}
            {step === 3 && (
              <div className="text-center space-y-4">
                <div className="text-green-600 text-lg font-semibold">Password reset successful!</div>
                <Button className="w-full" onClick={() => window.location.href = "/login"}>
                  Go to Login
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;
