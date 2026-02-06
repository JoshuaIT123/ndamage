const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "exam_prep"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("MySQL Connected");
});

// GET all students
app.get("/students", (req, res) => {
    db.query("SELECT * FROM students", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// GET student by ID
app.get("/students/:id", (req, res) => {
    const id = req.params.id;

    db.query("SELECT * FROM students WHERE id = ?", [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(results[0]);
    });
});

// CREATE student
app.post("/students", (req, res) => {
    const { names, age, grade, email } = req.body;

    db.query(
        "INSERT INTO students (names, age, grade, email) VALUES (?, ?, ?, ?)",
        [names, age, grade, email],
        (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: "Student Created Successfully!" });
        }
    );
});

// UPDATE student
app.put("/students/:id", (req, res) => {
    const { names, age, grade, email } = req.body;
    const id = req.params.id;

    db.query(
        "UPDATE students SET names=?, age=?, grade=?, email=? WHERE id=?",
        [names, age, grade, email, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.status(200).json({ message: "Student Updated Successfully!" });
        }
    );
});

// DELETE student
app.delete("/students/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM students WHERE id=?", [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student Deleted Successfully!" });
    });
});

// START SERVER
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
