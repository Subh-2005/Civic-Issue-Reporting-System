import React from 'react';
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield, Users, MapPin, Award, Target, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  const navigate = useNavigate();

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
                onClick={() => navigate('/')}
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
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-4">
                About CivicReport
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Empowering citizens to build better communities through technology-driven civic engagement and transparent governance.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto space-y-12"
            >
              <div className="text-center space-y-6">
                <h2 className="text-3xl font-bold">Our Mission</h2>
                <p className="text-lg text-muted-foreground">
                  CivicReport is a revolutionary platform designed to bridge the gap between citizens and government authorities. 
                  We enable efficient reporting, tracking, and resolution of civic issues while promoting transparency and accountability in governance.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                >
                  <Card className="glass-effect border-0 shadow-[var(--shadow-elevated)] h-full">
                    <CardHeader>
                      <Shield className="h-12 w-12 text-primary mb-4" />
                      <CardTitle>Transparent Governance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Promoting accountability through open reporting and real-time status tracking of civic issues.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <Card className="glass-effect border-0 shadow-[var(--shadow-elevated)] h-full">
                    <CardHeader>
                      <Users className="h-12 w-12 text-primary mb-4" />
                      <CardTitle>Community Engagement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Building stronger communities by encouraging active citizen participation in local governance.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Card className="glass-effect border-0 shadow-[var(--shadow-elevated)] h-full">
                    <CardHeader>
                      <Zap className="h-12 w-12 text-primary mb-4" />
                      <CardTitle>Efficient Resolution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Streamlining the process from issue reporting to resolution with smart assignment and tracking.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-center">How It Works</h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl font-bold text-primary">1</span>
                    </div>
                    <h3 className="text-xl font-semibold">Report Issues</h3>
                    <p className="text-muted-foreground">
                      Citizens can easily report civic problems with photos, location, and detailed descriptions.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl font-bold text-primary">2</span>
                    </div>
                    <h3 className="text-xl font-semibold">Smart Assignment</h3>
                    <p className="text-muted-foreground">
                      Issues are automatically categorized and assigned to relevant departments for quick action.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl font-bold text-primary">3</span>
                    </div>
                    <h3 className="text-xl font-semibold">Track Progress</h3>
                    <p className="text-muted-foreground">
                      Real-time updates keep citizens informed about the status and resolution of their reports.
                    </p>
                  </motion.div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 text-center space-y-6">
                <h2 className="text-3xl font-bold">Built for SIH 2025</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  This platform represents our commitment to leveraging technology for better governance. 
                  Designed with citizens at the heart, built for the future of civic engagement.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-full">
                    <Target className="h-5 w-5 text-primary" />
                    <span className="font-medium">Innovation</span>
                  </div>
                  <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-full">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="font-medium">Security</span>
                  </div>
                  <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-full">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="font-medium">Excellence</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;