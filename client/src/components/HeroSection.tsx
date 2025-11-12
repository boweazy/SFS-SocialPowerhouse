import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden circuit-bg">
      {/* Floating stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-1 h-1 bg-sfs-gold rounded-full animate-pulse" />
        <div className="absolute top-[25%] right-[20%] w-1 h-1 bg-sfs-gold rounded-full animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-[30%] left-[25%] w-1 h-1 bg-sfs-gold rounded-full animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-[60%] right-[30%] w-1 h-1 bg-sfs-gold rounded-full animate-pulse" style={{animationDelay: '1.5s'}} />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-24 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
          AI-Powered Social Media<br />Management Made Simple
        </h1>
        <p className="text-xl md:text-2xl text-sfs-beige/80 mb-12 max-w-3xl mx-auto">
          Create engaging content, schedule posts across platforms, and grow your audience with intelligent AI assistance
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <Button 
            size="lg" 
            className="bg-sfs-gold hover:bg-sfs-gold-hover text-sfs-black font-bold text-lg px-10 py-7 rounded-full shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] transition-all"
          >
            Get Started Free
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-sfs-gold/40 text-sfs-beige hover:bg-sfs-gold/10 text-lg px-10 py-7 rounded-full backdrop-blur-sm"
          >
            <Play className="w-5 h-5 mr-2" />
            Watch Demo
          </Button>
        </div>
        
        <p className="text-sm text-sfs-beige/50">
          Trusted by 5,000+ marketers worldwide
        </p>
      </div>
    </section>
  );
}
