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
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="card-civic h-full hover:scale-105 transition-all duration-300 group">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`h-12 w-12 rounded-xl ${colorMap[feature.color as keyof typeof colorMap]} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <Badge className={colorMap[feature.color as keyof typeof colorMap]}>
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Process Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Streamlined Resolution Process
            </h3>
            <p className="text-muted-foreground">
              From report to resolution in record time
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Camera, title: "Report", desc: "Citizen reports issue", time: "< 2 min" },
              { icon: Zap, title: "Process", desc: "AI categorization & routing", time: "< 1 min" },
              { icon: Users, title: "Assign", desc: "Department assignment", time: "< 1 hour" },
              { icon: Award, title: "Resolve", desc: "Issue resolution", time: "< 7 days" }
            ].map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary/20"></div>
                  )}
                </div>
                <h4 className="font-semibold text-foreground mb-2">{step.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{step.desc}</p>
                <Badge className="bg-success/10 text-success border-success/20">
                  <Clock className="h-3 w-3 mr-1" />
                  {step.time}
                </Badge>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};