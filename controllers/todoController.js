const model = require("../models/index");
const jwt = require("jsonwebtoken");
const Todo = model.todos;
const TodoItem = model.todo_items

exports.index = async (req, res) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(403).json({message: "Forbidden"})
    }
    const user = jwt.verify(token, process.env.JWT_KEY);
    const todos = await Todo.findAll({
        where: {userId: user.id},
        include: [{
            model: TodoItem,
            as: "todo_items"
        }]
    });
    return res.status(200).json({data: todos});
}

exports.show = async (req, res) => {
    const todoItems = await TodoItem.findAll({where: {todoId: req.params.id}});
    return res.status(200).json({data: todoItems});
}

exports.storeFile = async (req, res) => {
    try {
        const { title } = req.body;
        const token = req.headers.authorization;
        if(!token){
            return res.status(403).json({message: "Forbidden"})
        }
        const user = jwt.verify(token, process.env.JWT_KEY);
        const todo = await Todo.create({ title: title || "Untitled", isLiked: false, userId: user.id });
        res.status(201).json({
            message: "Store todo file success",
            data: todo,
        })
    } catch (err) {
        console.log(err)
        res.status(500).end();
    }
}
exports.storeTodo = async (req, res) => {
    try {
        const { content } = req.body;
        const todoItem = await TodoItem.create({ content, isChecked: false, todoId: req.params.id});
        res.status(201).json({
            message: "Store todo list success",
            data: todoItem,
        })
    } catch (err) {
        console.log(err)
        res.status(500).end();
    }
}

exports.updateTitle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const todo = await Todo.findOne({where: {id: id}});
        todo.title = title || "Untitled";
        todo.save();

        res.status(200).json({
            message: "Update todo title success",
            data: todo,
        })
    } catch {
        res.status(500).end();
    }
}
exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const todoItem = await TodoItem.findOne({where: {id: id}});
        todoItem.content = content;
        todoItem.save();

        res.status(200).json({
            message: "Update todo list success",
            data: todoItem,
        })
    } catch {
        res.status(500).end();
    }
}

exports.updateLike = async (req, res) => {
    try {
        const { id } = req.params;
        const { isLiked } = req.body;
        const todo = await Todo.findOne({where: {id: id}});
        if (!todo) {
            res.status(404).json({
                message: "Todo not found"
            });
        }
        todo.isLiked = isLiked;
        todo.save();

        res.status(200).json({
            message: "Update is liked success",
            data: todo,
        });
    } catch (err) {
        res.status(500).end();
    }
}
exports.updateCheck = async (req, res) => {
    try {
        const { id } = req.params;
        const { isChecked } = req.body;
        const todoItem = await TodoItem.findOne({where: {id: id}});
        if (!todoItem) {
            res.status(404).json({
                message: "Todo item not found"
            });
        }
        todoItem.isChecked = isChecked;
        todoItem.save();

        res.status(200).json({
            message: "Update is liked success",
            data: todoItem,
        });
    } catch (err) {
        res.status(500).end();
    }
}

exports.destroy = async (req, res) => {
    try {
        const { id } = req.params;
        await TodoItem.destroy({where: {todoId: id}})
        await Todo.destroy({where: {id: id}});
        res.status(200).json({
            message: "Delete todo success",
        });
    } catch {
        res.status(500).end();
    }
}

exports.destroyTodo = async (req, res) => {
    try {
        const { id } = req.params;
        await TodoItem.destroy({where: {id: id}});
        res.status(200).json({
            message: "Delete todo list success",
        });
    } catch {
        res.status(500).end();
    }
}