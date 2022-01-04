const mysql = require('mysql2');
const express = require('express');
const { process_params } = require('express/lib/router');
const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require('./utils/inputCheck');

// Express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Connect to SQL Database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySql Username
        user: 'root',
        // Your MySql Password
        password: '.C3MsZ%56eX8x*Sp',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

// Get all candidates API endpoint
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.sendStatus(500).json({ error: err.message });
        }
        res.json ({
            message: 'success',
            data: rows
        });
    });
});

// GET a single candidate
app.get('/api/candidates/:id', (req, res) => {
    const sql = `SELECT * FROM candidates WHERE id = ?`;
    const params = [req.params.id]; // holds value of the id

    db.query(sql, params, (err, row) => {
        if (err) {
            res.sendStatus(400).json ({ error: error.message});
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Delete a candidate
app.delete('/api/candidates/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// Create a candidate
app.post('/api/candidates', ({ body}, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
        res.sendStatus(400).json({ error: errors });
        return;
    }

    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
        VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
     if (err) {
        res.status(400).json({ error: err.message });
        return;
  }
  res.json({
    message: 'success',
    data: body
    });
  });
});


// Default response for any other request (Not Found) 
app.use((req, res) => {
    res.sendStatus(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});