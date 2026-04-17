function App() {
  const [data, setData] = useState<any>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      type: form.type.value,
      area: Number(form.area.value),
      season: form.season.value,
    };

    const emissions = formData.area * 0.5;
    const score = Math.max(0, 100 - emissions);

    // ✅ SAVE TO BACKEND
    fetch("https://carbon-wise-homes.onrender.com/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        building_type: formData.type,
        area: formData.area,
        emissions: emissions,
        score: score
      })
    })
      .then(res => res.json())
      .then(resData => {
        console.log("Saved:", resData);
      })
      .catch(err => console.error(err));

    // ✅ UPDATE UI
    setData(formData);
  };

  const emissions = data ? (data.area * 0.5) : 0;

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>🌱 EcoCalc</h2>
        <nav>
          <p>Dashboard</p>
          <p>Calculator</p>

        </nav>
      </aside>

      {/* MAIN */}
      <main className="main">

        {/* HEADER */}
        <div className="header">
          <h1>Carbon Emission Calculator</h1>
        </div>

        {/* TOP GRID */}
        <div className="grid">

          {/* FORM */}
          <form className="card form" onSubmit={handleSubmit}>
            <h3>Building Details</h3>

            <label>Building Type</label>
            <select name="type">
              <option>Residential</option>
              <option>Office</option>
              <option>Hospital</option>
              <option>School</option>
              <option>Retail</option>
              <option>Warehouse</option>
              <option>Other</option>
            </select>

            <label>Floor Area (sq.m)</label>
            <input type="number" name="area" required />

            <label>Season</label>
            <select name="season">
              <option>Summer ☀️</option>
              <option>Winter ❄️</option>
              <option>Monsoon 🌧️</option>

            </select>

            <button>Calculate</button>
          </form>

          {/* RESULTS */}
          {data && (
            <div className="card results">
              <h3>Results</h3>

              <p><b>Type:</b> {data.type}</p>
              <p><b>Area:</b> {data.area} sq.m</p>
              <p><b>Season:</b> {data.season}</p>

              <h2 className="highlight">
                {emissions.toFixed(2)} tons CO₂
              </h2>
            </div>
          )}

        </div>

        {/* STATS */}
        {data && (
          <div className="stats">

            <div className="stat green">
              <h4>Emissions</h4>
              <p>{emissions.toFixed(2)}</p>
            </div>

            <div className="stat blue">
              <h4>Score</h4>
              <p>{Math.max(0, 100 - emissions).toFixed(0)}</p>
            </div>

            <div className="stat purple">
              <h4>Efficiency</h4>
              <p>Moderate</p>
            </div>

          </div>
        )}

        {/* WHAT-IF SCENARIOS */}
        {data && (
          <div className="card scenarios">
            <h3>What-If Scenarios</h3>

            <ul>
              <li>🌞 Solar Panels → reduce 20%</li>
              <li>💡 LED Lighting → reduce 10%</li>
              <li>🧱 Better Insulation → reduce 15%</li>
              <li>❄ Smart HVAC → reduce 12%</li>
            </ul>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;