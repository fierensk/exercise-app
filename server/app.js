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

//dynamically returns queries based on whats searched 
app.get('/api', (req, res) => {
    const search = req.query.search || "";
    const query = `
        SELECT * FROM schema
        WHERE name LIKE ?
        ORDER BY id
    `;
    const searchTerm = `%${search}%`;

    db.all(query, [searchTerm], (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "There's some database problem" });
            return;
        }
        res.json({ message: "Filtered results from db", data: rows });
    });
});

// Queries database to insert new list
app.post('/addList', (req, res) => {
    // Only adds data if list contains at least one object
    if (req.body["data"].length > 0) {
        let listIds = ''; // String of array objects containing ids
        for (let i = 0; i < req.body["data"].length; i++) {
            // TODO: Find storage for reps and other stuff
            listIds += `["${req.body["data"][`${i}`]["id"]}"],`;
        }

        // Inserts object into database to create a list item
        db.run(`INSERT INTO lists(exercise_ids) VALUES('${listIds.substring(0, listIds.length-1)}');`, err => {
            // Returns an error message and message indicating being unable to update
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Unable to insert list into database."});
                return;
            }
        });
    }

    // Returns a message indicating database insert was a success
    res.json({ message: "Data loaded successfully" });
});

// Retrieves list values for list view page
app.get('/getLists', (req, res) => {
    db.all('SELECT * FROM lists ORDER by id;', (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Unable to retrieve data at this time." });
            return;
        }

        // Returns a message indicating successful send of data
        res.json({ message: "Data loaded successfully", data: rows });
    });
});