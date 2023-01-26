const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todoController");

router.get('/api/todos', todoController.index);
router.get('/api/todos/:id', todoController.show);
router.post('/api/todos', todoController.store);
router.put('/api/todos/:id', todoController.update);
router.patch('/api/todos/:id/update-isliked', todoController.updateLike);
router.delete('/api/todos/:id', todoController.destroy);

module.exports = router;