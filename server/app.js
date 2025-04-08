import {createRequire} from "module";
const require = createRequire(import.meta.url);

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({origin: '*'}));
app.use(bodyParser.json());

app.get('/api', (req, res) => {
    res.json({message: 'Hello from NodeJS!'});
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Requires actual database to pull from (either file or reading json file)
var mysql = require('mysql');
var connection = mysql.createConnection({
    debug: true,
    host: 'localhost',
    user: 'root',
    password: 'password'
});
connection.connect((err) => {
    if (err) {
        console.log(err);
        console.log('Try creating a real one first!');
        return;
    }
    console.log('Database connection created!');
});