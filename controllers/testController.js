const data = require("../data.json");

const test = (req, res) => {
    res.send(data);
}

module.exports = { test }