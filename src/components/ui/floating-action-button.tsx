import { motion } from "framer-motion";
import { Plus, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FloatingActionButtonProps {
  onClick?: () => void;
  className?: string;
  icon?: "plus" | "camera";
}

export const FloatingActionButton = ({ 
  onClick, 
  className,
  icon = "camera" 
}: FloatingActionButtonProps) => {
  const Icon = icon === "plus" ? Plus : Camera;

  return (
    <motion.div
      className={cn(
        "fixed bottom-6 right-6 z-50",
        className
      )}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      <Button
        onClick={onClick}
        className="h-16 w-16 rounded-full btn-framer-primary shadow-[var(--shadow-glow)] 
                   hover:shadow-[0_0_60px_hsl(var(--primary)/0.6)] transition-all duration-300"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
      </Button>
    </motion.div>
  );
};