const data = require("../data.json");
const db = require("../models");
const Test = db.tests;


exports.test = (req, res) => {
    res.send({'status': 'ok'});
}

// const testDb = (req, res) => {
    
// }

exports.index = async (req, res) => {
    const tests = await Test.findAll();
    res.status(200).json({
        data: tests,
    });
}


exports.show = async (req, res) => {
    const test = await Test.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({
        data: test,
    });
}


exports.store = async (req, res) => {
    await Test.create({
        name: req.body.name,
        username: req.body.username,
    })
    .then((test) => {
        res.status(201).json({
            data: test
        });
    })
    .catch((e) => {
        console.log(e);
        res.status(503).json(e.errors);
    })
}


exports.update = async (req, res) => {
    const test = await Test.findOne({
        where: {
            id: req.params.id,
        }
    });
    if (test) {
        test.name = req.body.name;
        test.username = req.body.username;
        await test.save();
        res.status(200).json({
            data: test,
        });
    } else {
        res.status(404).end();
    }
}


exports.destroy = async (req, res) => {
    const test = await Test.findOne({
        where: {
            id: req.params.id,
        }
    });
    if (test) {
        test.destroy();
        res.status(204).end();
    } else {
        res.status(404).end();
    }
}