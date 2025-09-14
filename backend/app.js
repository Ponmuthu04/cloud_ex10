const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
    console.log("Connected to database!");
});

app.post("/users", (req, res) => {
    const { name, email } = req.body;
    const query = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.query(query, [name, email], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, name, email });
    });
});

app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const query = "UPDATE users SET name = ?, email = ? WHERE id = ?";
    db.query(query, [name, email, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ id: parseInt(id), name, email });
    });
});

app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User deleted" });
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
