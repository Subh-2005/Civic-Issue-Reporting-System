import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Users,
  Shield,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

export const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
      >
        <motion.div
          className="absolute top-1/4 left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -25, 0],
            y: [0, 15, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            viewport={{ once: true }}
          >
            <Badge
              className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30 
                             px-6 py-3 mb-8 text-sm font-semibold backdrop-blur-sm shadow-[0_0_30px_hsl(var(--primary)/0.3)]
                             hover:scale-105 transition-transform"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Ready to Get Started?
            </Badge>
          </motion.div>

          <motion.h2
            className="text-4xl lg:text-7xl font-bold text-foreground mb-8 leading-[0.9]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Join Thousands of Citizens
            <motion.span
              className="gradient-hero bg-clip-text text-transparent block"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
            >
              Making a Difference
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Start reporting issues, tracking progress, and building stronger
            communities today. Your voice matters in creating positive change
            through our government-verified platform.
          </motion.p>

          {/* Enhanced CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button className="btn-framer-primary text-xl px-12 py-8 relative group overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 
                             group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <Camera className="mr-3 h-6 w-6" />
                Report Your First Issue
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="ml-3 h-6 w-6" />
                </motion.div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                className="btn-framer-ghost text-xl px-12 py-8 group"
                onClick={() =>
                  window.open(
                    "https://chat.whatsapp.com/L0rzJl06nnGLv1vwvP466G",
                    "_blank"
                  )
                }
              >
                <Users className="mr-3 h-6 w-6" />
                Join Community
                <motion.div
                  className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="h-6 w-6" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Trust Indicators */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 pt-16 border-t border-border/50"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {[
              {
                icon: Shield,
                title: "Government Verified",
                description:
                  "Official platform certified by government digital standards",
                color: "success",
                delay: 0.1,
              },
              {
                icon: Users,
                title: "Community Driven",
                description:
                  "Built by citizens, for citizens with transparent processes",
                color: "primary",
                delay: 0.2,
              },
              {
                icon: Camera,
                title: "Mobile First",
                description:
                  "Optimized for smartphones with offline capabilities",
                color: "secondary",
                delay: 0.3,
              },
            ].map((indicator, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 1.2 + indicator.delay,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  rotateY: 5,
                }}
                className="flex flex-col items-center space-y-4 group perspective-1000"
              >
                <motion.div
                  className={`h-20 w-20 rounded-3xl bg-${indicator.color}/20 flex items-center justify-center
                             shadow-[0_0_40px_hsl(var(--${indicator.color})/0.4)] 
                             group-hover:shadow-[0_0_60px_hsl(var(--${indicator.color})/0.6)]`}
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -15, 15, 0],
                    transition: { duration: 0.8 },
                  }}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.7,
                  }}
                >
                  <indicator.icon
                    className={`h-10 w-10 text-${indicator.color}`}
                  />
                </motion.div>

                <motion.h3
                  className="font-bold text-foreground text-lg group-hover:text-primary transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {indicator.title}
                </motion.h3>

                <p className="text-muted-foreground text-center leading-relaxed">
                  {indicator.description}
                </p>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4 + indicator.delay, type: "spring" }}
                  viewport={{ once: true }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <CheckCircle className={`h-5 w-5 text-${indicator.color}`} />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
