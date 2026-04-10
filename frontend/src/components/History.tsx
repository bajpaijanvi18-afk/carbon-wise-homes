import { useEffect, useState } from "react";

export const History = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/history")
            .then((res) => res.json())
            .then(setData);
    }, []);

    return (
        <div style={card}>
            <h2>History</h2>

            <div style={{ display: "grid", gap: "10px" }}>
                {data.map((item) => (
                    <div key={item.id} style={smallCard}>
                        <b>{item.building_type}</b>
                        <p>Area: {item.area}</p>
                        <p>Emissions: {item.emissions.toFixed(2)}</p>
                        <p>Score: {item.score.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const card = {
    background: "#fff",
    padding: "20px",
    margin: "20px",
    borderRadius: "10px",
};

const smallCard = {
    background: "#f9f9f9",
    padding: "10px",
    borderRadius: "8px",
};