import { useState } from "react";

export interface BuildingData {
  buildingType: string;
  floorArea: number;
  season: string;
}

export const CalculatorForm = ({ onCalculate }: any) => {
  const [buildingType, setBuildingType] = useState("residential");
  const [floorArea, setFloorArea] = useState(100);
  const [season, setSeason] = useState("summer");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    onCalculate({
      buildingType,
      floorArea,
      season,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <h2 className="text-xl font-semibold">Building Input</h2>

      <div>
        <label>Type</label>
        <select
          className="w-full p-2 rounded bg-slate-800 text-white"
          value={buildingType}
          onChange={(e) => setBuildingType(e.target.value)}
        >
          <option value="residential">Residential</option>
          <option value="office">Office</option>
          <option value="hospital">Hospital</option>
          <option value="school">School</option>
          <option value="retail">Retail</option>
          <option value="warehouse">Warehouse</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label>Floor Area</label>
        <input
          type="number"
          className="w-full p-2 rounded bg-slate-800 text-white"
          value={floorArea}
          onChange={(e) => setFloorArea(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Season</label>
        <select
          className="w-full p-2 rounded bg-slate-800 text-white"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          <option value="summer">Summer</option>
          <option value="winter">Winter</option>
          <option value="monsoon">Monsoon</option>
          <option value="spring">Spring</option>
        </select>
      </div>

      <button className="w-full bg-green-500 p-2 rounded hover:bg-green-600">
        Calculate
      </button>

    </form>
  );
};