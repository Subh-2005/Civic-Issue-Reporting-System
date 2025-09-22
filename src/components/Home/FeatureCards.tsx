import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  MapPin, 
  Bell, 
  Users, 
  BarChart3, 
  Shield,
  Zap,
  Award,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Camera,
    title: "Smart Issue Reporting",
    description: "Capture and report civic issues with AI-powered categorization and location detection.",
    badge: "Mobile-First",
    color: "primary"
  },
  {
    icon: MapPin,
    title: "Interactive Map Explorer",
    description: "Visualize community issues on an interactive map with real-time status updates.",
    badge: "Real-time",
    color: "secondary"
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get instant updates on your reported issues and community developments.",
    badge: "Instant",
    color: "success"
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track resolution times, issue trends, and community engagement metrics.",
    badge: "Admin",
    color: "warning"
  },
  {
    icon: Users,
    title: "Community Engagement",
    description: "Collaborate with fellow citizens and earn civic engagement badges.",
    badge: "Social",
    color: "secondary"
  },
  {
    icon: Shield,
    title: "Government Grade Security",
    description: "Enterprise-level security with data privacy compliance for government use.",
    badge: "Secure",
    color: "primary"
  }
];

const colorMap = {
  primary: "bg-primary/10 text-primary border-primary/20",
  secondary: "bg-secondary/10 text-secondary border-secondary/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20"
};

export const FeatureCards = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-muted/30 to-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-20"
        >
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
            ⚡ Platform Features
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            Built for Modern
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}Civic Engagement
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive tools designed for citizens, administrators, and government officials to collaborate effectively.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex"
            >
              <Card className="card-civic h-full w-full hover:scale-[1.02] hover:shadow-xl transition-all duration-300 group border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                <CardHeader className="space-y-4 pb-4">
                  <div className="flex items-start justify-between">
                    <div className={`h-14 w-14 rounded-2xl ${colorMap[feature.color as keyof typeof colorMap]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <Badge className={`${colorMap[feature.color as keyof typeof colorMap]} font-medium px-3 py-1`}>
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground leading-tight">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-muted-foreground leading-relaxed text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
};