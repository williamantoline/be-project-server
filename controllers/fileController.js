const model = require("../models/index");
const jwt = require("jsonwebtoken");
const File = model.files;
const Note = model.notes;
const Todo = model.todos;
const FilableType = require("../models/enums/FilableType");


exports.index = async (req, res) => {
    try {
        const files = await File.findAll({
            where: {
                userId: req.user.id
            },
            include: [Note, Todo],
        });
        
        return res.status(200).json({
            data: files,
        });

    } catch (err) {
        return res.status(500).end();
    }
}


exports.show = async (req, res) => {
    const file = await File.findOne({
        where: {
            id: req.params.id,
            userId: req.user.id,
        },
        include: [Note, Todo],
    });
    if (!file) {
        return res.status(404).json({
            message: "Not found"
        });
    }

    return res.status(200).json({
        data: file
    });
}


exports.store = async (req, res) => {
    try {
        const { type } = req.body;
        if (type === FilableType.note) {
            const { title, content } = req.body;

            const note = await Note.create({
                content: content,

            });

            const file = await File.create({
                userId: req.user.id,
                title: title,
                filableType: FilableType.note,
                filableId: note.id,
                isLiked: false,
            });

            const resource = {
                ...file.dataValues,
                filable: note,
            };

            res.status(201).json({
                message: "Store file success",
                data: resource,
            });

        } else if (type === FilableType.todo) {
            const { title } = req.body;
            const todo = await Todo.create({
                title,
            });
            
            const file = File.create({
                userId: req.user.id,
                title,
                filableType: FilableType.todo,
                filableId: todo.id,
                isLiked: false,
            });

            const resource = {
                ...file.dataVales,
                filable: todo,
            };

            res.status(201).json({
                message: "Store file success",
                data: resource,
            });
        };

    } catch (err) {
        res.status(500).end();
    }
}


exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await File.findOne({
            where: {
                id: id,
                userId: req.user.id,
            }
        });

        if (file.filableType === FilableType.note) {
            const { title, content } = req.body;

            const note = await Note.findOne({
                where: {
                    id: file.filableId,
                }
            });
            note.content = content;
            note.save();

            file.title = title;
            file.save();

            const resource = {
                ...file.dataValues,
                filable: note,
            };
            console.log(resource);

            res.status(201).json({
                message: "Update file success",
                data: resource,
            });
        } 

    } catch (err) {
        res.status(500).end();
    }
}


exports.destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const file = await File.findOne({
            where: {
                id: id,
                userId: req.user.id,
            }
        });
        if (!file) {
            return res.status(404).json({
                message: "not found",
            });

        }

        if (file.filableType === FilableType.note) {
            await Note.destroy({
                where: {
                    id: file.filableId,
                }
            });
        } else if (file.filableType === FilableType.todo) {
            await Todo.destroy({
                where: {
                    id: file.filableId,
                }
            });
        }
        file.destroy();

        res.status(200).json({
            message: "Delete file success"
        });
    } catch (err) {
        throw err;
        res.status(500).end();
    }
}