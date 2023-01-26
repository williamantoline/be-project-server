const express = require("express");
const router = express.Router();

const authController = require('../controllers/authController')
const { validateUser } = require('../middleware/userValidator')

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.post('/auth/revoke', authController.revoke)
router.get('/auth/me', authController.me)

module.exports = router;