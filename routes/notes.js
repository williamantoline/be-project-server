const express = require("express");
const router = express.Router();

const notesController = require('../controllers/notesController')

router.get('/notes', notesController.index)

module.exports = router;