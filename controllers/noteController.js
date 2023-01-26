const model = require("../models/index");
const jwt = require("jsonwebtoken");
const Note = model.notes;

exports.index = async (req, res) => {
    const token = req.headers.authorization;
    const user = jwt.verify(token, process.env.JWT_KEY);
    console.log(user)
    const notes = await Note.findAll({ where: {userId: user.id} });
    return res.status(200).json({data: notes});
}

exports.show = async (req, res) => {
    const note = await Note.findOne({where: {id: req.params.id}});
    return res.status(200).json({data: note});
}

exports.store = async (req, res) => {
    try {
        const { content } = req.body;
        const token = req.headers.authorization;
        const user = jwt.verify(token, process.env.JWT_KEY);
        if (!user) {
            res.status(404).end();
        }

        const note = await Note.create({ content, isLiked: false, userId: user.id});
        res.status(201).json({
            message: "Store note success",
            data: note,
        })
    } catch (err) {
        console.log(err)
        res.status(500).end();
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const note = await Note.findOne({where: {id: id}});
        note.content = content;
        note.save();

        res.status(200).json({
            message: "Update note success",
            data: note,
        })
    } catch {
        res.status(500).end();
    }
}

exports.updateLike = async (req, res) => {
    try {
        const { id } = req.params;
        const { isLiked } = req.body;
        const note = await Note.findOne({where: {id: id}});
        if (!note) {
            res.status(404).json({
                message: "Note not found"
            });
        }
        note.isLiked = isLiked;
        note.save();

        res.status(200).json({
            message: "Update is liked success",
            data: note,
        });
    } catch (err) {
        res.status(500).end();
    }
}

exports.destroy = async (req, res) => {
    try {
        const { id } = req.params;
        await Note.destroy({where: {id: id}});

        res.status(200).json({
            message: "Delete note success",
        });
    } catch {
        res.status(500).end();
    }
}