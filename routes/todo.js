const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todoController");

router.get('/api/todos', todoController.index);
router.get('/api/todos/:id', todoController.show);
router.post('/api/todosFile', todoController.storeFile);
router.post('/api/todosItem/:id', todoController.storeTodo);
router.put('/api/todosFile/:id', todoController.updateTitle);
router.put('/api/todosItem/:id', todoController.updateTodo);
router.patch('/api/todosFile/:id/update-isliked', todoController.updateLike);
router.patch('/api/todosItem/:id/update-ischecked', todoController.updateCheck);
router.delete('/api/todos/:id', todoController.destroy);
router.delete('/api/todosItem/:id', todoController.destroyTodo);

module.exports = router;