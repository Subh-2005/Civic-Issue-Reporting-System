import React, { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestOtp, verifyOtp } from "@/lib/otpApi";

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Step 1: Request OTP
  const handleSendOtp = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    const res = await requestOtp(identifier);
    if (res.error) {
      setError(res.error);
    } else {
      setStep(2);
      setSuccess("OTP sent to your email. Please check your inbox.");
    }
    setLoading(false);
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    const res = await verifyOtp(identifier, otp);
    if (res.error) {
      setError(res.error);
    } else {
      setSuccess("OTP verified successfully. You may now reset your password.");
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
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendOtp();
                }}
                className="space-y-6"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  disabled={loading}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
                {error && <div className="text-red-600 text-sm">{error}</div>}
                {success && <div className="text-green-600 text-sm">{success}</div>}
              </form>
            )}
            {step === 2 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleVerifyOtp();
                }}
                className="space-y-6"
              >
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  disabled={loading}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Verifying OTP..." : "Verify OTP"}
                </Button>
                {error && <div className="text-red-600 text-sm">{error}</div>}
                {success && <div className="text-green-600 text-sm">{success}</div>}
              </form>
            )}
            {step === 3 && (
              <div className="text-center space-y-4">
                <div className="text-green-600 text-lg font-semibold">
                  OTP verified successfully!
                </div>
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
