const model = require("../models/index");
const jwt = require("jsonwebtoken");
const File = model.files;
const Note = model.notes;
const Todo = model.todos;
const TodoItem = model.todo_items;
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

    let fileResource = file;
    if (file.filableType === FilableType.todo) {
        const todoItems = await TodoItem.findAll({
            where: {
                todoId: file.filableId,
            }
        });
        const todoResource = {...file.todo.dataValues, todoItems: todoItems};
        fileResource = {...file.dataValues, todo: todoResource};
    }

    return res.status(200).json({
        data: fileResource,
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

            res.status(201).json({
                message: "Update file success",
                data: resource,
            });
        } 

    } catch (err) {
        res.status(500).end();
    }
}


exports.updateTitle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        const file = await File.findOne({
            where: {
                id: id
            }
        });
        file.title = title || "Untitled";
        file.save();

        res.status(200).json({
            message: "Update title success",
            data: file,
        });
    } catch (err) {
        throw err;
        res.status(500).end();
    }
}


exports.updateLike = async (req, res) => {
    try {
        const { id } = req.params;
        const { isLiked } = req.body;
        const file = await File.findOne({
            where: {
                id: id,
                userId: req.user.id,
            }
        });

        if (!file) {
            res.status(404).json({
                message: "file not found"
            });
        }
        file.isLiked = isLiked;
        file.save();

        res.status(200).json({
            message: "Update is liked success",
            data: file,
        });
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


exports.addTodoItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const file = await File.findOne({
            where: {
                id: id,
                userId: req.user.id,
                filableType: FilableType.todo,
            },
            include: [Todo],
        });
        if (!file) {
            return res.status(404).json({
                message: "not found",
            });
        }

        const todo = file.todo;
        const todoItem = await TodoItem.create({
            todoId: todo.id,
            content, 
            isChecked: false, 
        });

        const todoItems = await TodoItem.findAll({
            where: {
                todoId: file.filableId,
            }
        });
        const todoResource = {...file.todo.dataValues, todoItems: todoItems};
        fileResource = {...file.dataValues, todo: todoResource};

        res.status(201).json({
            message: "Store todo list success",
            data: todoItems,
        });
    } catch (err) {
        res.status(500).end();
    }
}


exports.editTodoItem = async (req, res) => {
    try {
        const { fileId, todoItemId } = req.params;
        const { content } = req.body;

        const file = await File.findOne({
            where: {
                id: fileId,
                filableType: FilableType.todo,
            },
            include: [Todo],
        });
        if (!file) {
            return res.status(404).json({
                message: "not found",
            });
        }

        const todo = file.todo;
        const todoItem = await TodoItem.findOne({
            where: {
                todoId: todo.id,
                id: todoItemId,
            }
        });
        todoItem.content = content;
        todoItem.save();


        const todoItems = await TodoItem.findAll({
            where: {
                todoId: file.filableId,
            }
        });
        const todoResource = {...file.todo.dataValues, todoItems: todoItems};
        fileResource = {...file.dataValues, todo: todoResource};

        res.status(200).json({
            message: "edit todo list success",
            data: todoItems,
        });
    } catch (err) {
        res.status(500).end();
    }
}


exports.editTodoItemCheck = async (req, res) => {
    try {
        const { fileId, todoItemId } = req.params;
        const { isChecked } = req.body;

        const file = await File.findOne({
            where: {
                id: fileId,
                filableType: FilableType.todo,
            },
            include: [Todo],
        });
        if (!file) {
            return res.status(404).json({
                message: "not found",
            });
        }

        const todo = file.todo;
        const todoItem = await TodoItem.findOne({
            where: {
                todoId: todo.id,
                id: todoItemId,
            }
        });
        todoItem.isChecked = isChecked;
        todoItem.save();


        const todoItems = await TodoItem.findAll({
            where: {
                todoId: file.filableId,
            }
        });
        const todoResource = {...file.todo.dataValues, todoItems: todoItems};
        fileResource = {...file.dataValues, todo: todoResource};

        res.status(200).json({
            message: "edit todo list success",
            data: todoItems,
        });
    } catch (err) {
        throw err;
        res.status(500).end();
    }
}


exports.deleteTodoItem = async (req, res) => {
    try {
        const { fileId, todoItemId } = req.params;

        const file = await File.findOne({
            where: {
                id: fileId,
                filableType: FilableType.todo,
            },
            include: [Todo],
        });
        if (!file) {
            return res.status(404).json({
                message: "not found",
            });
        }

        const todo = file.todo;
        await TodoItem.destroy({
            where: {
                todoId: todo.id,
                id: todoItemId,
            }
        });

        const todoItems = await TodoItem.findAll({
            where: {
                todoId: file.filableId,
            }
        });
        const todoResource = {...file.todo.dataValues, todoItems: todoItems};
        fileResource = {...file.dataValues, todo: todoResource};

        res.status(200).json({
            message: "delete todo list success",
            data: todoItems,
        });
    } catch (err) {
        res.status(500).end();
    }
}