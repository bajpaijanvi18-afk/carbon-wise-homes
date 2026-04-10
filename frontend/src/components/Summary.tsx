import { useEffect, useState } from "react";

export const Summary = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/history")
            .then((res) => res.json())
            .then(setData);
    }, []);

    if (!data.length) return null;

    const avg =
        data.reduce((sum, d) => sum + d.emissions, 0) / data.length;

    return (
        <div style={card}>
            <h2>Insights</h2>
            <p>Total Entries: {data.length}</p>
            <p>Average Emissions: {avg.toFixed(2)}</p>
        </div>
    );
};

const card = {
    background: "#fff",
    padding: "20px",
    margin: "20px",
    borderRadius: "10px",
};