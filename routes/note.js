const express = require("express");
const router = express.Router();

const noteController = require("../controllers/noteController");

router.get('/api/notes', noteController.index);
router.get('/api/notes/:id', noteController.show);
router.post('/api/notes', noteController.store);
router.put('/api/notes/:id', noteController.update);
router.patch('/api/notes/:id/update-isliked', noteController.updateLike);
router.delete('/api/notes/:id', noteController.destroy);


module.exports = router;