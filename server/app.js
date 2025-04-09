// Imports to mimick require - no longer used in this version of Node.js
import {createRequire} from "module";
const require = createRequire(import.meta.url);

// Import modules to create middleware via Express
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

// Sets up modules to create middleware
const app = express();
const port = 3000;

// Import moduels for database functionalities
import sqlite3 from 'sqlite3';

// Start setting up middleware to carry jsons from server to client side
app.use(cors({origin: '*'}));
app.use(bodyParser.json());

// Establishes port for backend (messages can be viewed via the terminal running local backend)
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Creates connection to database file and logs any errors with connection
const db = new sqlite3.Database('server/exercises.db', (err) => {
    if (err) {
        console.log(err);
    }
});

// Uses middleware to connect to frontend and sends welcome message and database rows via Express body's json
app.get('/api', (req, res) => {
    db.all('SELECT * FROM schema ORDER BY id', (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json({message: 'Hello from NodeJS! Below are all of the database objects:', data: rows});
    });
});