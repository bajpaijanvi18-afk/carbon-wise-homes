import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Zap, Sun, Home, TrendingDown } from "lucide-react";

interface Upgrade {
  id: string;
  name: string;
  icon: typeof Lightbulb;
  reduction: number;
  cost: number;
  description: string;
}

interface WhatIfScenariosProps {
  currentEmissions: number;
}

const upgrades: Upgrade[] = [
  {
    id: "led",
    name: "LED Lighting",
    icon: Lightbulb,
    reduction: 15,
    cost: 5000,
    description: "Replace all traditional bulbs with energy-efficient LEDs",
  },
  {
    id: "solar",
    name: "Solar Panels",
    icon: Sun,
    reduction: 40,
    cost: 25000,
    description: "Install rooftop solar panel system",
  },
  {
    id: "hvac",
    name: "Smart HVAC",
    icon: Zap,
    reduction: 25,
    cost: 15000,
    description: "Upgrade to smart climate control system",
  },
  {
    id: "insulation",
    name: "Better Insulation",
    icon: Home,
    reduction: 20,
    cost: 8000,
    description: "Improve building envelope and insulation",
  },
];

export const WhatIfScenarios = ({ currentEmissions }: WhatIfScenariosProps) => {
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);

  const toggleUpgrade = (id: string) => {
    setSelectedUpgrades((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  };

  const totalReduction = selectedUpgrades.reduce((acc, id) => {
    const upgrade = upgrades.find((u) => u.id === id);
    return acc + (upgrade?.reduction || 0);
  }, 0);

  const totalCost = selectedUpgrades.reduce((acc, id) => {
    const upgrade = upgrades.find((u) => u.id === id);
    return acc + (upgrade?.cost || 0);
  }, 0);

  const newEmissions = Math.max(0, currentEmissions * (1 - totalReduction / 100));
  const emissionsSaved = currentEmissions - newEmissions;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">What-If Scenarios</h2>
          <p className="text-muted-foreground">
            Try different upgrades and see instant impact on your carbon footprint
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upgrades.map((upgrade) => {
            const Icon = upgrade.icon;
            const isSelected = selectedUpgrades.includes(upgrade.id);

            return (
              <Card
                key={upgrade.id}
                className={`cursor-pointer transition-all shadow-lg ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => toggleUpgrade(upgrade.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isSelected ? "bg-primary" : "bg-primary/10"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-primary"}`} />
                      </div>
                      <CardTitle className="text-xl">{upgrade.name}</CardTitle>
                    </div>
                    <Badge variant={isSelected ? "default" : "outline"}>
                      {isSelected ? "Selected" : "Select"}
                    </Badge>
                  </div>
                  <CardDescription>{upgrade.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">-{upgrade.reduction}%</div>
                      <div className="text-sm text-muted-foreground">CO₂ reduction</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">${upgrade.cost.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Investment</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {selectedUpgrades.length > 0 && (
          <Card className="shadow-lg border-primary bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-primary" />
                <CardTitle>Combined Impact</CardTitle>
              </div>
              <CardDescription>Potential savings with selected upgrades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-card rounded-lg border border-border">
                  <div className="text-3xl font-bold text-primary mb-1">
                    {emissionsSaved.toFixed(1)} tons
                  </div>
                  <div className="text-sm text-muted-foreground">CO₂ Saved Annually</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border border-border">
                  <div className="text-3xl font-bold text-primary mb-1">{totalReduction}%</div>
                  <div className="text-sm text-muted-foreground">Total Reduction</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border border-border">
                  <div className="text-3xl font-bold text-primary mb-1">
                    ${totalCost.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Investment</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-card rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">New annual emissions:</strong>{" "}
                  {newEmissions.toFixed(1)} tons CO₂ (down from {currentEmissions.toFixed(1)} tons)
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};
