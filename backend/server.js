const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Database
const db = new sqlite3.Database('./ecocalc.db');

// Create table
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

// Test route
app.get('/', (req, res) => {
    res.send('Backend is working 🚀');
});

// Save calculation
app.post('/save', (req, res) => {
    const { building_type, area, emissions, score } = req.body;

    db.run(
        `INSERT INTO calculations (building_type, area, emissions, score) VALUES (?, ?, ?, ?)`,
        [building_type, area, emissions, score],
        function (err) {
            if (err) return res.status(500).send(err);
            res.send({ id: this.lastID });
        }
    );
});

// Get history
app.get('/history', (req, res) => {
    db.all(
        `SELECT * FROM calculations ORDER BY created_at DESC`,
        [],
        (err, rows) => {
            if (err) return res.status(500).send(err);
            res.send(rows);
        }
    );
});

// ✅ FIXED PORT (IMPORTANT FOR RENDER)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});