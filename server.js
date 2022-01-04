const mysql = require('mysql2');
const express = require('express');
const { process_params } = require('express/lib/router');
const PORT = process.env.PORT || 3001;
const app = express();

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

// database query
db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});


// Default response for any other request (Not Found) 
app.use((req, res) => {
    res.sendStatus(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});