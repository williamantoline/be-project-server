const express = require("express");
const app = express();

require('dotenv').config();

const cors = require("cors");
app.use(cors());

app.use(express.json());


// const conn = require("./db");
// conn.connect();

const db = require("./models");

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });


// const user = {
//     name: 'user',
//     email: 'abc@gmail.com',
//     username: 'abc',
//     password: 'random',
// };

// const User = db.users;
// User.create(user)
//     .then(() => console.log('abc'));


// main routing
const testRoutes = require("./routes/test");
const authRoutes = require("./routes/auth");
app.use(testRoutes);
app.use(authRoutes);

// handle 404
app.use((req, res, next) => {
    res.status(404);
    res.send({
        message: 'Not Found'
    });
});

// handle error
// app.use((err, req, res, next) => {
//     res.status(500);
//     res.send({
//         message: 'Internal Server Error'
//     });
// });


// test push

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;
app.listen(port, host);
console.log(`Running on http://${host}:${port}`);