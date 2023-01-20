const express = require("express");
const router = express.Router();

const testController = require("../controllers/testController");

router.get('/api/test', testController.test);
// router.get('/api/test-db', testController.testDb);
router.get('/api/tests', testController.index);
router.get('/api/tests/:id', testController.show);
router.post('/api/tests', testController.store);
router.put('/api/tests/:id', testController.update);
router.delete('/api/tests/:id', testController.destroy);


module.exports = router;