import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

export interface BuildingData {
  floorArea: number;
  workingDays: number;
  buildingType: string;
  climateZone: string;
}

interface CalculatorFormProps {
  onCalculate: (data: BuildingData) => void;
}

export const CalculatorForm = ({ onCalculate }: CalculatorFormProps) => {
  const [formData, setFormData] = useState<BuildingData>({
    floorArea: 0,
    workingDays: 260,
    buildingType: "",
    climateZone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.floorArea && formData.buildingType && formData.climateZone) {
      onCalculate(formData);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg border-primary/10">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-3xl">Building Information</CardTitle>
            <CardDescription>Enter your building details to calculate emissions</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="floorArea">Floor Area (sq. ft)</Label>
                <Input
                  id="floorArea"
                  type="number"
                  placeholder="e.g., 5000"
                  value={formData.floorArea || ""}
                  onChange={(e) => setFormData({ ...formData, floorArea: Number(e.target.value) })}
                  required
                  className="border-primary/20 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="buildingType">Building Type</Label>
                <Select
                  value={formData.buildingType}
                  onValueChange={(value) => setFormData({ ...formData, buildingType: value })}
                  required
                >
                  <SelectTrigger id="buildingType" className="border-primary/20 focus:border-primary">
                    <SelectValue placeholder="Select building type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office">Office Building</SelectItem>
                    <SelectItem value="retail">Retail Store</SelectItem>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                    <SelectItem value="hospital">Hospital</SelectItem>
                    <SelectItem value="school">School</SelectItem>
                    <SelectItem value="residential">Residential Complex</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="climateZone">Climate Zone</Label>
                <Select
                  value={formData.climateZone}
                  onValueChange={(value) => setFormData({ ...formData, climateZone: value })}
                  required
                >
                  <SelectTrigger id="climateZone" className="border-primary/20 focus:border-primary">
                    <SelectValue placeholder="Select climate zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tropical">Tropical (Hot & Humid)</SelectItem>
                    <SelectItem value="dry">Dry (Hot & Arid)</SelectItem>
                    <SelectItem value="temperate">Temperate (Mild)</SelectItem>
                    <SelectItem value="continental">Continental (Cold Winters)</SelectItem>
                    <SelectItem value="polar">Polar (Very Cold)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="workingDays">Working Days per Year</Label>
                <Input
                  id="workingDays"
                  type="number"
                  placeholder="e.g., 260"
                  value={formData.workingDays}
                  onChange={(e) => setFormData({ ...formData, workingDays: Number(e.target.value) })}
                  required
                  className="border-primary/20 focus:border-primary"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                size="lg"
              >
                Calculate Emissions
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
