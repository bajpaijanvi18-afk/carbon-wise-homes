import { Button } from "@/components/ui/button";
import { Leaf, TrendingDown } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background" />

      <div className="relative max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20">
          <Leaf className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Building a Sustainable Future</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
          Calculate Your Building's
          <span className="block mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Carbon Footprint
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
          Discover how much CO₂ your building emits annually and get personalized strategies
          to reduce your environmental impact. Start your journey to net-zero today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={onGetStarted}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg"
          >
            <TrendingDown className="w-5 h-5 mr-2" />
            Start Calculating
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/30 hover:bg-primary/5"
          >
            Learn More
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6 rounded-lg bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-primary mb-2">Instant</div>
            <div className="text-muted-foreground">Results in seconds</div>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-primary mb-2">Accurate</div>
            <div className="text-muted-foreground">Data-driven insights</div>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold text-primary mb-2">Actionable</div>
            <div className="text-muted-foreground">Clear next steps</div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
