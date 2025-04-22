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
    // Finds last used Id to attach workout steps and name to next List Id
    db.get(`SELECT MAX(id) from lists;`, (err, row) => {
        if (err) {
            console.log(err);
            res.status(500).json({message: 'Unable to insert into database.'});
            return;
        }
        let listId = row["MAX(id)"] + 1;

        // Inserts object into database to create a list item
        db.run(`INSERT INTO lists(name) VALUES('List ${listId}');`, err => {
            // Returns an error message and message indicating being unable to update
            if (err) {
                console.log(err);
                res.status(500).json({ message: "Unable to insert list into database." });
                return;
            }
        });

        // Inserts each step into database and attaches to newly created list
        for (let i = 0; i < req.body["data"].length; i++) {
            let query = `INSERT INTO workout_step (id, list_num, exercise_id, sets, reps) `;
            query += `VALUES('${listId}-${req.body["data"][`${i}`]["id"]}', ${listId}, '${req.body["data"][`${i}`]["id"]}', ${req.body["data"][`${i}`]["sets"]}, ${req.body["data"][`${i}`]["reps"]})`;
            db.run(query, (err, row) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: "Unable to insert list into database." });
                    return;
                }
            })
        }
    });

    // Returns a message indicating database insert was a success
    res.json({ message: "Data loaded successfully" });
});

// Retrieves list values for list view page
app.get('/getLists', (req, res) => {
    // Create jsons with Exercise Name, Sets, Reps, Exercise Instructions for each List Name
    let query = 'SELECT l.name, w.id, w.exercise_id, w.sets, w.reps, s.name as exercise_name, s.instructions '
                + 'FROM (lists as l INNER JOIN workout_step as w ON l.id = w.list_num) '
                + 'INNER JOIN schema as s ON w.exercise_id = s.id ORDER BY w.id;'
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: "Unable to retrieve data at this time." });
            return;
        }

        // Iterates through rows to return a JSON file with objects organized by list
        let data = {};
        rows.forEach(row => {
            if (data[`${row["name"]}`] === undefined) {
                data[`${row["name"]}`] = {};
            }
            data[`${row["name"]}`][`${row["exercise_id"]}`] = { listId: row["id"], sets: row["sets"], reps: row["reps"], name: row["exercise_name"], instructions: row["instructions"] };
        });

        // Returns a message indicating successful send of data
        res.json({ message: "Data loaded successfully", data: data });
    });
});