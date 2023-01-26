const model = require("../models/index");
const Todo = model.todos;
const User = model.users;

exports.index = async (req, res) => {
    const todos= await Todo.findAll();
    return res.status(200).json({data: todos});
}

exports.show = async (req, res) => {
    const todo = await Todo.findOne({where: {id: req.params.id}});
    return res.status(200).json({data: todo});
}

exports.store = async (req, res) => {
    try {
        const { title } = req.body;
        const user = await User.findOne();
        if (!user) {
            res.status(404).end();
        }
        const todo = await Todo.create({ title, isLiked: false, userId: user.id,});
        res.status(201).json({
            message: "Store todo success",
            data: todo,
        })
    } catch (err) {
        console.log(err)
        res.status(500).end();
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const todo = await Todo.findOne({where: {id: id}});
        todo.title = title;
        todo.save();

        res.status(200).json({
            message: "Update todo title success",
            data: todo,
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

exports.destroy = async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.destroy({where: {id: id}});

        res.status(200).json({
            message: "Delete todo success",
        });
    } catch {
        res.status(500).end();
    }
}