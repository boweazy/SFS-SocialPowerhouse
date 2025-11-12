import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import AIShowcase from "@/components/AIShowcase";
import Testimonials from "@/components/Testimonials";
import PricingTeaser from "@/components/PricingTeaser";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-sfs-black">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesGrid />
        <AIShowcase />
        <Testimonials />
        <PricingTeaser />
      </main>
      <Footer />
    </div>
  );
}
