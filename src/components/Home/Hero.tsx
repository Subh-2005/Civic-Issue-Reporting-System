import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import {
  Camera,
  MapPin,
  Users,
  Shield,
  CheckCircle,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

export const Hero = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Building Communities";

  // Controls for stagger animation of cards
  const cardControls = useAnimation();

  // Cursor blinking animation control
  const [cursorVisible, setCursorVisible] = useState(true);

  // Floating particles data
  const floatingParticles = [
    { id: 1, size: 20, x: 40, y: 80, delay: 0 },
    { id: 2, size: 15, x: 100, y: 150, delay: 1 },
    { id: 3, size: 25, x: 200, y: 50, delay: 2 },
    { id: 4, size: 10, x: 300, y: 120, delay: 1.5 },
    { id: 5, size: 18, x: 350, y: 30, delay: 0.5 },
  ];

  // Cityscape buildings data
  const buildings = [
    { height: 120, width: 40, x: 10, color: "bg-slate-600" },
    { height: 180, width: 50, x: 60, color: "bg-slate-700" },
    { height: 100, width: 35, x: 120, color: "bg-slate-500" },
    { height: 200, width: 55, x: 170, color: "bg-slate-800" },
    { height: 140, width: 45, x: 240, color: "bg-slate-600" },
    { height: 160, width: 40, x: 300, color: "bg-slate-700" },
    { height: 90, width: 30, x: 350, color: "bg-slate-500" },
    { height: 220, width: 60, x: 400, color: "bg-slate-800" },
    { height: 130, width: 38, x: 470, color: "bg-slate-600" },
    { height: 170, width: 48, x: 520, color: "bg-slate-700" },
  ];

  // Moving cars data
  const cars = [
    { id: 1, x: -50, speed: 20, delay: 0 },
    { id: 2, x: -100, speed: 25, delay: 3 },
    { id: 3, x: -150, speed: 18, delay: 6 },
  ];

  const handleReportIssue = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Selected files:", files);
      alert(`Selected ${files.length} file(s) for issue reporting!`);
    }
  };

  const handleExploreMap = () => {
    navigate("/map");
  };

  // Typing effect with realistic timing and cursor blinking
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 120 + Math.random() * 80); // Randomized typing speed for realism

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Start stagger animation for cards on mount
  useEffect(() => {
    cardControls.start("visible");
  }, [cardControls]);

  // Parallax effect for background gradient based on mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const backgroundX = useTransform(x, [-100, 100], ["-20%", "20%"]);
  const backgroundY = useTransform(y, [-100, 100], ["-20%", "20%"]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = event;
    const rect = currentTarget.getBoundingClientRect();
    const posX = clientX - rect.left - rect.width / 2;
    const posY = clientY - rect.top - rect.height / 2;
    x.set(posX);
    y.set(posY);
  };

  return (
    <>
      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 text-black dark:from-[#0a0a23] dark:to-[#1e3a8a] dark:text-white"
        aria-label="Hero section"
        onMouseMove={handleMouseMove}
      >
        {/* Cityscape Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Sky gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Clouds */}
          <motion.div
            className="absolute top-10 left-10 w-20 h-8 bg-white rounded-full opacity-70"
            animate={{
              x: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-20 right-20 w-16 h-6 bg-white rounded-full opacity-60"
            animate={{
              x: [0, -40, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Buildings */}
          {buildings.map((building, index) => (
            <motion.div
              key={index}
              className={`absolute bottom-0 ${building.color} opacity-80`}
              style={{
                width: building.width,
                height: building.height,
                left: building.x,
              }}
              animate={{
                x: [0, -10, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            >
              {/* Windows */}
              <div className="grid grid-cols-2 gap-1 p-2 h-full">
                {Array.from({ length: Math.floor(building.height / 20) }).map((_, i) => (
                  <div key={i} className="bg-yellow-200 opacity-60 rounded-sm" style={{ height: '8px' }} />
                ))}
              </div>
            </motion.div>
          ))}

          {/* Road */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gray-800">
            {/* Road markings */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-yellow-400 transform -translate-y-1/2">
              <motion.div
                className="w-full h-full bg-white"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </div>

          {/* Moving Cars */}
          {cars.map((car) => (
            <motion.div
              key={car.id}
              className="absolute bottom-4 w-8 h-4 bg-red-500 rounded"
              style={{ left: car.x }}
              animate={{
                x: ["-10%", "110%"],
              }}
              transition={{
                duration: car.speed,
                repeat: Infinity,
                ease: "linear",
                delay: car.delay,
              }}
            />
          ))}
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20"
            style={{
              backgroundPositionX: backgroundX,
              backgroundPositionY: backgroundY,
            }}
            animate={{
              backgroundPositionX: ["-20%", "20%", "-20%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Floating Elements */}
        {floatingParticles.map(({ id, size, x, y, delay }) => (
          <motion.div
            key={id}
            className="absolute rounded-full bg-primary/10 blur-xl"
            style={{
              width: size,
              height: size,
              top: y,
              left: x,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          />
        ))}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content Section - Left */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.25, 0.25, 0, 1] }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 120 }}
              >
                <Badge
                  className="bg-primary/20 text-primary border-primary/30 px-6 py-3 mb-8 text-sm font-semibold
                               backdrop-blur-sm shadow-[0_0_30px_hsl(var(--primary)/0.3)] hover:scale-105 transition-transform"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  SIH 2025 Government Innovation
                </Badge>
              </motion.div>

              <motion.h1
                className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-8 leading-snug"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <span>Empowering Citizens</span>
                <br />
                <span className="relative inline-block">
                  <span className="gradient-hero bg-clip-text text-transparent relative z-10">
                    {displayText}
                    {cursorVisible && <span className="ml-1">|</span>}
                  </span>
                </span>
              </motion.h1>
            </motion.div>

            {/* Role Selection Cards - Right Side */}
            <motion.div
              className="grid md:grid-cols-2 gap-8"
              initial="hidden"
              animate={cardControls}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              {/* Citizen Portal Card */}
              <motion.div
                className="glass-effect rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
                }}
                whileHover={{ scale: 1.03, y: -6, boxShadow: "0 10px 20px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.97 }}
                role="region"
                aria-label="Citizen Portal"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                    <Users className="w-8 h-8 text-blue-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Citizen Portal
                  </h3>

                  <div className="space-y-2 text-sm text-muted-foreground mb-8 text-left">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" aria-hidden="true" />
                      Report civic issues with photos and location
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" aria-hidden="true" />
                      Track status of your reports
                    </div>
                  </div>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold shadow-md"
                    onClick={() => navigate("/report")}
                    aria-label="Continue as Citizen"
                  >
                    Continue as Citizen
                  </Button>
                </div>
              </motion.div>

              {/* Admin Dashboard Card */}
              <motion.div
                className="glass-effect rounded-2xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 shadow-lg"
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
                }}
                whileHover={{ scale: 1.03, y: -6, boxShadow: "0 10px 20px rgba(34, 197, 94, 0.4)" }}
                whileTap={{ scale: 0.97 }}
                role="region"
                aria-label="Admin Dashboard"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                    <Shield className="w-8 h-8 text-green-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Admin Dashboard
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-8 text-left">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" aria-hidden="true" />
                      View and manage all reported issues
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" aria-hidden="true" />
                      Track resolution progress and analytics
                    </div>
                  </div>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold shadow-md"
                    onClick={() => navigate("/admin")}
                    aria-label="Continue as Admin"
                  >
                    Continue as Admin
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Hidden file input for drag and drop functionality */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          accept="image/*,video/*"
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
        />

        <FloatingActionButton className="lg:hidden" />
      </section>
    </>
  );
};
