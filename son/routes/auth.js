const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/',authController.loginPage);
router.post('/',authController.loginData);

module.exports = router;