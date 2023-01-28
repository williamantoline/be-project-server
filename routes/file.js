const express = require("express");
const router = express.Router();

const fileController = require("../controllers/fileController");

router.get('/api/files', fileController.index);
router.get('/api/files/:id', fileController.show);
router.post('/api/files', fileController.store);
router.put('/api/files/:id', fileController.update);
router.patch('/api/files/:id/update-title', fileController.updateTitle);
router.patch('/api/files/:id/update-isliked', fileController.updateLike);
router.delete('/api/files/:id', fileController.destroy);

router.patch('/api/files/:id/add-todo-item', fileController.addTodoItem);
router.patch('/api/files/:fileId/:todoItemId/edit-todo-item', fileController.editTodoItem);
router.patch('/api/files/:fileId/:todoItemId/edit-todo-item-check', fileController.editTodoItemCheck);
router.delete('/api/files/:fileId/:todoItemId/delete-todo-item', fileController.deleteTodoItem);


module.exports = router;