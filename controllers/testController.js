const data = require("../data.json");
const conn = require("../db");


const test = (req, res) => {
    res.send({'status': 'ok'});
}

const testDb = (req, res) => {
    conn.query('SELECT 1 + 1 AS abc LIMIT 1', (err, result) => {
        if (err) res.send({'status': 'error'});
        res.send({'status': 'ok'});
    });
}


module.exports = { test, testDb }