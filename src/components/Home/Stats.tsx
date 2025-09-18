import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, CheckCircle, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: CheckCircle,
    value: "1,247",
    label: "Issues Resolved",
    description: "Successfully completed this month",
    trend: "+23%",
    color: "success"
  },
  {
    icon: Users,
    value: "25,000+",
    label: "Active Citizens",
    description: "Engaged community members",
    trend: "+12%",
    color: "primary"
  },
  {
    icon: Clock,
    value: "4.2 days",
    label: "Avg Resolution Time",
    description: "Faster than previous quarter",
    trend: "-15%",
    color: "secondary"
  },
  {
    icon: MapPin,
    value: "150+",
    label: "Areas Covered",
    description: "Across all districts",
    trend: "+8%",
    color: "warning"
  }
];

const colorMap = {
  primary: "from-primary/20 to-primary/5",
  secondary: "from-secondary/20 to-secondary/5", 
  success: "from-success/20 to-success/5",
  warning: "from-warning/20 to-warning/5"
};

const iconColorMap = {
  primary: "text-primary bg-primary/10",
  secondary: "text-secondary bg-secondary/10",
  success: "text-success bg-success/10", 
  warning: "text-warning bg-warning/10"
};

export const Stats = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <Badge className="bg-secondary/10 text-secondary border-secondary/20 px-4 py-2">
            📊 Platform Impact
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            Delivering Results for
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}Communities
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real metrics from our platform showcase the positive impact on civic engagement and issue resolution.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`card-civic p-6 bg-gradient-to-br ${colorMap[stat.color as keyof typeof colorMap]} hover:scale-105 transition-all duration-300 group`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`h-12 w-12 rounded-xl ${iconColorMap[stat.color as keyof typeof iconColorMap]} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <Badge className={`bg-${stat.color}/20 text-${stat.color} border-${stat.color}/30`}>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.trend}
                  </Badge>
                </div>
                
                <div>
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="font-semibold text-foreground text-lg mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">98.5%</div>
            <div className="text-lg font-semibold text-foreground mb-1">Citizen Satisfaction</div>
            <div className="text-muted-foreground">Based on post-resolution surveys</div>
          </div>
          
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-secondary mb-2">24/7</div>
            <div className="text-lg font-semibold text-foreground mb-1">Platform Availability</div>
            <div className="text-muted-foreground">Continuous service uptime</div>
          </div>
          
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-success mb-2">50%</div>
            <div className="text-lg font-semibold text-foreground mb-1">Faster Resolution</div>
            <div className="text-muted-foreground">Compared to traditional methods</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};