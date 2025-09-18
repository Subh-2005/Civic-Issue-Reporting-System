import React, { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Shield, Users, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"citizen" | "admin" | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleRoleSelect = (role: "citizen" | "admin") => {
    setSelectedRole(role);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      alert("Please choose a role before logging in.");
      return;
    }
    // Note: This is frontend only - actual authentication requires Supabase integration
    console.log("Login attempt:", { role: selectedRole, ...formData });
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-20 pb-12">
          <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-6"
              >
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="btn-framer-ghost"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center"
              >
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4">
                  Choose Your Role
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Select how you'd like to access the CivicReport platform
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Citizen Card */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="cursor-pointer"
                >
                  <Card className="glass-effect border-0 shadow-[var(--shadow-elevated)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105 h-full">
                    <CardHeader className="text-center space-y-4">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Users className="h-10 w-10 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">Citizen Portal</CardTitle>
                      <CardDescription className="text-base">
                        Report civic issues, track your submissions, and engage
                        with your community
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Report civic issues with photos and location</li>
                        <li>• Track status of your reports</li>
                        <li>• View community issues on interactive map</li>
                        <li>• Receive notifications on issue resolution</li>
                      </ul>
                      <Button
                        className="btn-framer-primary w-full mt-6"
                        onClick={() => handleRoleSelect("citizen")}
                      >
                        Continue as Citizen
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Admin Card */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="cursor-pointer"
                >
                  <Card className="glass-effect border-0 shadow-[var(--shadow-elevated)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-105 h-full">
                    <CardHeader className="text-center space-y-4">
                      <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                        <Shield className="h-10 w-10 text-secondary" />
                      </div>
                      <CardTitle className="text-2xl">
                        Admin Dashboard
                      </CardTitle>
                      <CardDescription className="text-base">
                        Manage civic issues, assign tasks, and oversee
                        resolution processes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• View and manage all reported issues</li>
                        <li>• Assign issues to relevant departments</li>
                        <li>• Track resolution progress and analytics</li>
                        <li>• Generate reports and insights</li>
                      </ul>
                      <Button
                        className="btn-framer-secondary w-full mt-6"
                        onClick={() => handleRoleSelect("admin")}
                      >
                        Continue as Admin
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 pb-12">
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-6"
            >
              <Button
                variant="outline"
                onClick={() => setSelectedRole(null)}
                className="btn-framer-ghost"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Change Role
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4">
                {selectedRole === "citizen" ? "Citizen" : "Admin"} Login
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Sign in to access your{" "}
                {selectedRole === "citizen" ? "citizen" : "admin"} dashboard
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="glass-effect border-0 shadow-[var(--shadow-elevated)]">
                <CardHeader className="text-center space-y-4">
                  <div
                    className={`w-16 h-16 ${
                      selectedRole === "citizen"
                        ? "bg-primary/10"
                        : "bg-secondary/10"
                    } rounded-full flex items-center justify-center mx-auto`}
                  >
                    {selectedRole === "citizen" ? (
                      <Users className="h-8 w-8 text-primary" />
                    ) : (
                      <Shield className="h-8 w-8 text-secondary" />
                    )}
                  </div>
                  <CardTitle className="text-2xl">Welcome Back</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your {selectedRole ?? ""}{" "}
                    account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password</label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          className="absolute right-2 top-2 h-6"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className={
                        selectedRole === "citizen"
                          ? "btn-framer-primary"
                          : "btn-framer-secondary"
                      }
                      size="lg"
                    >
                      Sign In
                    </Button>

                    <div className="text-center space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <button
                          type="button"
                          className="text-primary hover:underline font-medium"
                          onClick={() => navigate("/signup")}
                        >
                          Sign up here
                        </button>
                      </p>
                      <button
                        type="button"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot your password?
                      </button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
