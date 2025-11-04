import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingDown, Award, Leaf, Lightbulb } from "lucide-react";
import { BuildingData } from "./CalculatorForm";

interface ResultsProps {
  data: BuildingData;
}

const calculateEmissions = (data: BuildingData) => {
  // Energy intensity factors (kWh/sq.ft/year)
  const energyIntensity: Record<string, number> = {
    office: 15,
    retail: 18,
    warehouse: 8,
    hospital: 25,
    school: 12,
    residential: 10,
  };

  // Climate multipliers
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
  const co2Emissions = (annualEnergy * 0.92) / 2000; // tons CO2
  
  return Math.round(co2Emissions * 10) / 10;
};

const getGreenScore = (emissions: number, floorArea: number) => {
  const emissionsPerSqFt = emissions / floorArea * 1000;
  let score = Math.max(0, Math.min(100, 100 - emissionsPerSqFt * 15));
  return Math.round(score);
};

const getRank = (score: number) => {
  if (score >= 80) return { name: "Gold", emoji: "🥇", color: "text-yellow-500" };
  if (score >= 60) return { name: "Silver", emoji: "🥈", color: "text-gray-400" };
  return { name: "Bronze", emoji: "🥉", color: "text-orange-600" };
};

const getStrategies = (buildingType: string, climateZone: string) => {
  const strategies: Record<string, string[]> = {
    office: ["Install LED lighting", "Optimize HVAC schedules", "Add smart thermostats"],
    retail: ["Use natural lighting", "Install energy-efficient refrigeration", "Smart lighting controls"],
    warehouse: ["Install skylights", "Use efficient forklifts", "Improve insulation"],
    hospital: ["Energy recovery ventilators", "LED surgical lights", "Building automation"],
    school: ["Solar panels on roofs", "Energy monitoring systems", "Efficient boilers"],
    residential: ["Smart home systems", "Heat pumps", "Better insulation"],
  };

  const climateStrategies: Record<string, string[]> = {
    tropical: ["Maximize natural ventilation", "Solar shading systems"],
    dry: ["Evaporative cooling", "Thermal mass materials"],
    temperate: ["Heat recovery systems", "Double-glazed windows"],
    continental: ["High-performance insulation", "Air-tight construction"],
    polar: ["Triple-glazed windows", "Geothermal heating"],
  };

  return [...(strategies[buildingType] || []), ...(climateStrategies[climateZone] || [])];
};

export const Results = ({ data }: ResultsProps) => {
  const emissions = calculateEmissions(data);
  const score = getGreenScore(emissions, data.floorArea);
  const rank = getRank(score);
  const strategies = getStrategies(data.buildingType, data.climateZone);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Your Results</h2>
          <p className="text-muted-foreground">Based on your building information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-lg border-primary/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-primary" />
                <CardTitle>Annual Emissions</CardTitle>
              </div>
              <CardDescription>Estimated carbon footprint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary mb-2">{emissions} tons</div>
              <p className="text-muted-foreground mb-4">CO₂ equivalent per year</p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm">That's equivalent to:</p>
                <ul className="text-sm space-y-1 mt-2">
                  <li>🚗 Driving {Math.round(emissions * 2500)} miles</li>
                  <li>🌳 {Math.round(emissions * 16)} trees needed to offset</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-primary/10">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <CardTitle>Green Score</CardTitle>
              </div>
              <CardDescription>Your sustainability rating</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 mb-4">
                <div className="text-4xl font-bold text-primary">{score}</div>
                <div className="text-2xl pb-1">/100</div>
              </div>
              <Progress value={score} className="mb-4 h-3" />
              <Badge className={`${rank.color} text-lg px-4 py-1`}>
                {rank.emoji} {rank.name} Rank
              </Badge>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg border-primary/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              <CardTitle>Personalized Strategies</CardTitle>
            </div>
            <CardDescription>Tailored recommendations for your building</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {strategies.map((strategy, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/30 transition-colors"
                >
                  <Leaf className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{strategy}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
