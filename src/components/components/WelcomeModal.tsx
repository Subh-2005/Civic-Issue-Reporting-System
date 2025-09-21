import React, { useState, useEffect } from "react";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const WelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [userType, setUserType] = useState<"citizen" | "admin">("citizen");
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");

    if (!hasSeenWelcome) {
      const currentPath = window.location.pathname;
      const isAdminPath =
        currentPath.includes("/admin") || currentPath.includes("/admin-login");

      setUserType(isAdminPath ? "admin" : "citizen");
      setIsOpen(true);
    }
  }, []);

  const handleEnter = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenWelcome", "true");
    navigate(userType === "admin" ? "/admin" : "/");
  };

  const handleSwitch = (type: "citizen" | "admin") => {
    setIsOpen(false);
    localStorage.setItem("hasSeenWelcome", "true");
    navigate(type === "admin" ? "/admin-login" : "/");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="relative sm:max-w-[500px] p-0 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 border-2 border-primary/20 shadow-[var(--shadow-glow)]">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 animate-pulse opacity-50 pointer-events-none" />

        {/* Header */}
        <div className="relative p-8 text-center z-10">
          <div className="mb-6">
            <div className="relative inline-block">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-[var(--shadow-glow)] animate-pulse">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-foreground to-secondary-foreground flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">🏛️</span>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full animate-ping opacity-75" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-warning rounded-full animate-bounce opacity-75" />
            </div>
          </div>

          <DialogHeader className="space-y-4">
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {userType === "admin"
                ? "WELCOME DEAR ADMIN"
                : "WELCOME DEAR CITIZEN"}
            </DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground leading-relaxed">
              {userType === "admin"
                ? "Welcome to the Civic Pulse Admin Dashboard. Manage reports, oversee community issues, and make a difference in your community."
                : "Welcome to Civic Pulse! Report issues, track progress, and help build a better community together."}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Buttons */}
        <div className="relative px-8 pb-6 z-10">
          <div className="flex justify-center space-x-4 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <div
              className="w-2 h-2 bg-secondary rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="w-2 h-2 bg-primary rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleEnter}
              className="flex-1 text-lg py-6 hover:scale-105 transition-all duration-300"
            >
              Enter {userType === "admin" ? "Admin Dashboard" : "Civic Pulse"}
            </Button>

            <Button
              onClick={() =>
                handleSwitch(userType === "admin" ? "citizen" : "admin")
              }
              variant="outline"
              className="text-lg py-6 hover:scale-105 transition-all duration-300"
            >
              {userType === "admin" ? "I'm a Citizen" : "I'm an Admin"}
            </Button>
          </div>
        </div>

        <div className="h-2 bg-gradient-to-r from-primary via-secondary to-primary" />
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
