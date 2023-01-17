const express = require("express");
const router = express.Router();

const testController = require("./controllers/testController");
const authController = require("./controllers/authController");


router.get('/api/test', testController.test);
router.get('/api/test-db', testController.testDb);

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.post('/auth/revoke', authController.revoke)
router.get('/auth/me', authController.me)

module.exports = router;