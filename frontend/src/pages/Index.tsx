import { useState, useRef, useEffect } from "react";
import Hero from "../components/Hero";
import { CalculatorForm, BuildingData } from "../components/CalculatorForm";
import { Results } from "../components/Results";
import { WhatIfScenarios } from "../components/WhatIfScenarios";
import { Leaf } from "lucide-react";

const Index = () => {
  const [buildingData, setBuildingData] = useState<BuildingData | null>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);

  // ✅ Load saved data
  useEffect(() => {
    const savedData = localStorage.getItem("ecocalc_building_data");
    if (savedData) {
      setBuildingData(JSON.parse(savedData));
    }
  }, []);

  const handleGetStarted = () => {
    calculatorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCalculate = (data: BuildingData) => {
    setBuildingData(data);

    // Save
    localStorage.setItem("ecocalc_building_data", JSON.stringify(data));

    // Scroll
    setTimeout(() => {
      window.scrollBy({ top: 400, behavior: "smooth" });
    }, 100);
  };

  // ✅ FIXED: added safe optional chaining
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

    // ⚠️ FIX: if climateZone not present
    const climateMultiplier =
      "climateZone" in data
        ? climateMultipliers[(data as any).climateZone] || 1.0
        : 1.0;

    const annualEnergy = data.floorArea * baseIntensity * climateMultiplier;
    const co2Emissions = (annualEnergy * 0.92) / 2000;

    return Math.round(co2Emissions * 10) / 10;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100">

      {/* HEADER */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">EcoCalc</span>
          </div>

        </div>
      </header>

      {/* HERO */}
      <Hero onGetStarted={handleGetStarted} />

      {/* FORM */}
      <div ref={calculatorRef} className="max-w-4xl mx-auto px-4 mt-10">
        <CalculatorForm onCalculate={handleCalculate} />
      </div>

      {/* RESULTS */}
      {buildingData && (
        <div className="max-w-4xl mx-auto px-4 mt-10 space-y-6">
          <Results data={buildingData} />
          <WhatIfScenarios
            currentEmissions={calculateEmissions(buildingData)}
          />
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t mt-16 bg-white/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-10 text-center text-sm text-gray-600">
          © 2026 EcoCalc 🌱 Sustainable Future
        </div>
      </footer>

    </div>
  );
};

export default Index;