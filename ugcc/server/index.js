const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",   // your MySQL user
  password: "Bookmark1031@", // replace with your root password
  database: "ugcc",
  port:3306

});

// Test DB connection
db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database ✅");
  }
});

// Example route: Get all members
app.get("/members", (req, res) => {
  db.query("SELECT * FROM members", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
// ✅ Add new member
app.post("/members", (req, res) => {
  const { name, role, year } = req.body;
  const sql = "INSERT INTO members (name, role, year) VALUES (?, ?, ?)";
  db.query(sql, [name, role, year], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Member added successfully!", id: result.insertId });
  });
});

// ✅ Get all activities
app.get("/activities", (req, res) => {
  db.query("SELECT * FROM activities", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ✅ Add activity
app.post("/activities", (req, res) => {
  const { year, description } = req.body;
  const sql = "INSERT INTO activities (year, description) VALUES (?, ?)";
  db.query(sql, [year, description], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Activity added!", id: result.insertId });
  });
});

// ✅ Get all resources
app.get("/resources", (req, res) => {
  db.query("SELECT * FROM resources", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ✅ Add resource
app.post("/resources", (req, res) => {
  const { title, link } = req.body;
  const sql = "INSERT INTO resources (title, link) VALUES (?, ?)";
  db.query(sql, [title, link], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Resource added!", id: result.insertId });
  });
});
});
