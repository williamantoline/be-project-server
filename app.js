const express = require("express");
const app = express();

require('dotenv').config();

const cors = require("cors");
app.use(cors());

app.use(express.json());

const mysql = require('mysql');
const conn = mysql.createConnection({
    host: process.env.MYSQL_DB_HOST,
    port: process.env.MYSQL_DB_PORT,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
});
conn.connect();



// main routing
const routes = require("./routes");
app.use(routes);


// handle 404
app.use((req, res, next) => {
    res.status(404);
    res.send({
        message: 'Not Found'
    });
});

// handle error
app.use((err, req, res, next) => {
    res.status(500);
    res.send({
        message: 'Internal Server Error'
    });
});


// test push

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;
app.listen(port, host);
console.log(`Running on http://${host}:${port}`);
conn.end()