import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { useTranslation } from "react-i18next";

// Components
import NavigationMenu from "./components/ui/navigation-menu";

import OcrReader from "./components/OcrReader";

// Pages
import Index from "./pages/Index";
import MapExplorer from "./pages/MapExplorer";
import ReportIssue from "./pages/ReportIssue";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { t } = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* Navbar stays always visible */}
            <NavigationMenu />

            <main className="p-6">
              {/* Example: localized text */}
              <h1 className="text-2xl font-bold mb-4">{t("welcome")}</h1>
              <ol className="list-decimal ml-6 space-y-2">
                <li>{t("agreement")}</li>
                <li>{t("warning")}</li>
              </ol>

              {/* Routes */}
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/report" element={<ReportIssue />} />
                <Route path="/map" element={<MapExplorer />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/ocr" element={<OcrReader />} />
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

