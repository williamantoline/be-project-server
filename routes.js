const express = require("express");
const router = express.Router();

const testController = require("./controllers/testController");


router.get('/api/test', testController.test);
router.get('/api/test-db', testController.testDb);


module.exports = router;