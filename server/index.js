const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

//  Middleware for protected routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

// Auto-create a default admin user if none exists
const initAdmin = async () => {
  const defaultEmail = "admin@ugcc.com";
  const defaultPassword = "password123";

  db.query("SELECT * FROM users LIMIT 1", async (err, results) => {
    if (err) {
      console.error("Error checking users table:", err);
      return;
    }

    if (results.length === 0) {
      const hashed = await bcrypt.hash(defaultPassword, 10);
      db.query(
        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
        [defaultEmail, hashed, "admin"],
        (err2) => {
          if (err2) {
            console.error("Error creating default admin:", err2);
          } else {
            console.log(`✅ Default admin created: ${defaultEmail} / ${defaultPassword}`);
          }
        }
      );
    }
  });
};

initAdmin();

// =================== AUTH ROUTES ===================

// Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "All fields required" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, hashedPassword, "member"],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json({ message: "User registered successfully!", id: result.insertId });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(401).json({ error: "User not found" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login successful", token });
  });
});

// Logout 
app.post("/logout", (req, res) => {
  res.json({ message: "User logged out successfully (delete token on client)" });
});

// Profile
app.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: "Profile data", user: req.user });
});

// =================== CLUB ROUTES ===================

// Members
app.get("/members", authenticateToken, (req, res) => {
  db.query("SELECT * FROM members", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.post("/members", authenticateToken, (req, res) => {
  const { name, role, year } = req.body;
  db.query(
    "INSERT INTO members (name, role, year) VALUES (?, ?, ?)",
    [name, role, year],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Member added successfully!", id: result.insertId });
    }
  );
});

// Activities
app.get("/activities", (req, res) => {
  db.query("SELECT * FROM activities", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.post("/activities", authenticateToken, (req, res) => {
  const { year, description } = req.body;
  db.query(
    "INSERT INTO activities (year, description) VALUES (?, ?)",
    [year, description],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Activity added!", id: result.insertId });
    }
  );
});

// Resources
app.get("/resources", (req, res) => {
  db.query("SELECT * FROM resources", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.post("/resources", authenticateToken, (req, res) => {
  const { title, link } = req.body;
  db.query(
    "INSERT INTO resources (title, link) VALUES (?, ?)",
    [title, link],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Resource added!", id: result.insertId });
    }
  );
});

// =================== START SERVER ===================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
