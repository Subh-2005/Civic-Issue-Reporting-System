import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Hero } from "@/components/Home/Hero";
import { FeatureCards } from "@/components/Home/FeatureCards";
import { Stats } from "@/components/Home/Stats";
import { CTA } from "@/components/Home/CTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FeatureCards />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
