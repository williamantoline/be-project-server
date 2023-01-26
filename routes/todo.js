const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todoController");

router.get('/api/todos', todoController.index);
router.get('/api/todos/:id', todoController.show);
router.post('/api/todosFile', todoController.storeFile);
router.post('/api/todosItem', todoController.storeTodo);
router.put('/api/todosFile/:id', todoController.updateTitle);
router.put('/api/todosItem/:id', todoController.updateTodo);
router.patch('/api/todos/:id/update-isChecked', todoController.updateCheck);
router.delete('/api/todos/:id', todoController.destroy);

module.exports = router;