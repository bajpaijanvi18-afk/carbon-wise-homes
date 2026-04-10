import { BuildingData } from "./CalculatorForm";

export const Results = ({ data }: { data: BuildingData }) => {

  const emissions = (data.floorArea * 0.5) / 100;
  const score = Math.max(0, 100 - emissions);

  return (
    <div className="space-y-3">

      <h2 className="text-xl font-semibold">Results</h2>

      <p>Type: {data.buildingType}</p>
      <p>Area: {data.floorArea}</p>
      <p>Season: {data.season}</p>

      <p className="text-green-400 font-bold">
        Emissions: {emissions.toFixed(2)} tons
      </p>

      <p className="text-blue-400 font-bold">
        Score: {score.toFixed(0)}
      </p>

    </div>
  );
};