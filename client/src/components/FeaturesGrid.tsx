import { Sparkles, Calendar, BarChart3, Users, CalendarDays, Lightbulb } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Content Generation",
    description: "Generate engaging posts tailored to your brand voice and audience in seconds"
  },
  {
    icon: Calendar,
    title: "Multi-Platform Scheduling",
    description: "Schedule and publish content across all major social platforms from one dashboard"
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track performance metrics and gain insights to optimize your social strategy"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Work together seamlessly with approval workflows and role-based permissions"
  },
  {
    icon: CalendarDays,
    title: "Content Calendar",
    description: "Visualize your posting schedule and maintain consistent content flow"
  },
  {
    icon: Lightbulb,
    title: "Smart Suggestions",
    description: "Get AI-powered recommendations for best posting times and content ideas"
  }
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-24 bg-sfs-black relative overflow-hidden">
      {/* Circuit background faded */}
      <div className="absolute inset-0 circuit-bg opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need to Dominate Social
          </h2>
          <p className="text-xl text-sfs-beige/70">
            Powerful features designed for modern marketers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass-card p-8 group hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sfs-gold to-sfs-gold-hover flex items-center justify-center mb-6 group-hover:shadow-[0_0_25px_rgba(255,215,0,0.5)] transition-shadow">
                  <Icon className="w-7 h-7 text-sfs-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-sfs-beige/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
