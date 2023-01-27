const express = require("express");
const router = express.Router();

const fileController = require("../controllers/fileController");

router.get('/api/files', fileController.index);
router.get('/api/files/:id', fileController.show);
router.post('/api/files', fileController.store);
router.put('/api/files/:id', fileController.update);
// router.patch('/api/files/:id/update-isliked', fileController.updateLike);
router.delete('/api/files/:id', fileController.destroy);


module.exports = router;