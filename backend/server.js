const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS (safe for deployment)
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST"],
    })
);

// ✅ SQLite DB path (safe for Render + local)
const dbPath = path.join(__dirname, "ecocalc.db");
const db = new sqlite3.Database(dbPath);

// ==========================
// Create table
// ==========================
db.run(`
CREATE TABLE IF NOT EXISTS calculations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  building_type TEXT,
  area REAL,
  emissions REAL,
  score INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

// ==========================
// Routes
// ==========================

// Test route
app.get("/", (req, res) => {
    res.send("Backend is working 🚀");
});

// Save calculation
app.post("/save", (req, res) => {
    const { building_type, area, emissions, score } = req.body;

    db.run(
        `INSERT INTO calculations (building_type, area, emissions, score) VALUES (?, ?, ?, ?)`,
        [building_type, area, emissions, score],
        function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database insert failed" });
            }
            res.json({ id: this.lastID });
        }
    );
});

// Get history
app.get("/history", (req, res) => {
    db.all(
        `SELECT * FROM calculations ORDER BY created_at DESC`,
        [],
        (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Database fetch failed" });
            }
            res.json(rows);
        }
    );
});

// ==========================
// Start server (IMPORTANT FIX)
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});