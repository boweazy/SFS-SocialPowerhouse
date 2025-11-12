import { Button } from "@/components/ui/button";
import { Menu, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-sfs-gold/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sfs-gold to-sfs-gold-hover flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(255,215,0,0.5)] transition-shadow">
              <Sparkles className="w-6 h-6 text-sfs-black" />
            </div>
            <span className="text-xl font-bold text-white">
              SFS-SocialPowerhouse
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sfs-beige/80 hover:text-sfs-gold transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sfs-beige/80 hover:text-sfs-gold transition-colors">
              Pricing
            </a>
            <a href="/dashboard" className="text-sfs-beige/80 hover:text-sfs-gold transition-colors">
              Dashboard
            </a>
            <Button 
              className="bg-sfs-gold hover:bg-sfs-gold-hover text-sfs-black font-semibold px-6 shadow-[0_0_20px_rgba(255,215,0,0.3)]"
            >
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-sfs-gold"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-sfs-gold/20">
          <div className="px-4 py-6 space-y-4">
            <a href="#features" className="block text-sfs-beige hover:text-sfs-gold">
              Features
            </a>
            <a href="#pricing" className="block text-sfs-beige hover:text-sfs-gold">
              Pricing
            </a>
            <a href="/dashboard" className="block text-sfs-beige hover:text-sfs-gold">
              Dashboard
            </a>
            <Button className="w-full bg-sfs-gold hover:bg-sfs-gold-hover text-sfs-black font-semibold">
              Start Free Trial
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
