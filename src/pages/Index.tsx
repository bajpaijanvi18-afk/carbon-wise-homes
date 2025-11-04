import { useState, useRef } from "react";
import { Hero } from "@/components/Hero";
import { CalculatorForm, BuildingData } from "@/components/CalculatorForm";
import { Results } from "@/components/Results";
import { WhatIfScenarios } from "@/components/WhatIfScenarios";
import { Leaf } from "lucide-react";

const Index = () => {
  const [buildingData, setBuildingData] = useState<BuildingData | null>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    calculatorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCalculate = (data: BuildingData) => {
    setBuildingData(data);
    // Smooth scroll to results after a short delay
    setTimeout(() => {
      window.scrollBy({ top: 400, behavior: "smooth" });
    }, 100);
  };

  // Calculate emissions for what-if scenarios
  const calculateEmissions = (data: BuildingData) => {
    const energyIntensity: Record<string, number> = {
      office: 15,
      retail: 18,
      warehouse: 8,
      hospital: 25,
      school: 12,
      residential: 10,
    };

    const climateMultipliers: Record<string, number> = {
      tropical: 1.3,
      dry: 1.2,
      temperate: 1.0,
      continental: 1.1,
      polar: 1.4,
    };

    const baseIntensity = energyIntensity[data.buildingType] || 12;
    const climateMultiplier = climateMultipliers[data.climateZone] || 1.0;
    const annualEnergy = data.floorArea * baseIntensity * climateMultiplier;
    const co2Emissions = (annualEnergy * 0.92) / 2000;
    
    return Math.round(co2Emissions * 10) / 10;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">EcoCalc</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#calculator" className="text-muted-foreground hover:text-primary transition-colors">
              Calculator
            </a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <Hero onGetStarted={handleGetStarted} />

      {/* Calculator Form */}
      <div ref={calculatorRef}>
        <CalculatorForm onCalculate={handleCalculate} />
      </div>

      {/* Results */}
      {buildingData && (
        <>
          <Results data={buildingData} />
          <WhatIfScenarios currentEmissions={calculateEmissions(buildingData)} />
        </>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">EcoCalc</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Helping buildings reduce their carbon footprint, one calculation at a time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <p className="text-sm text-muted-foreground">
                Questions? Reach out to us at<br />
                <a href="mailto:info@ecocalc.com" className="text-primary hover:underline">
                  info@ecocalc.com
                </a>
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 EcoCalc. Building a sustainable future together.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
