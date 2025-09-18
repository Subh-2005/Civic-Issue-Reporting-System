import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, MapPin, Users, Shield, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { NotificationDropdown } from "@/components/Notifications/NotificationDropdown";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-civic">
              <Shield className="h-6 w-6 text-green-400" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">CivicReport</h1>
              <p className="text-xs text-muted-foreground">
                Government Digital Platform
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/report"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Report Issue
            </a>
            <a
              href="/map"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Map Explorer
            </a>
            <a
              href="/about"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <NotificationDropdown />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Login Button */}
            <Button
              className="hidden sm:flex btn-civic-primary"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border mt-2 pt-4 pb-4"
          >
            <nav className="flex flex-col space-y-3">
              <a
                href="/report"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Report Issue
              </a>
              <a
                href="/map"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Map Explorer
              </a>
              <a
                href="/about"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Contact
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button
                  className="btn-civic-primary w-full"
                  onClick={() => (window.location.href = "/login")}
                >
                  Login
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};
