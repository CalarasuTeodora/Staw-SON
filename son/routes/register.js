const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/',authController.registerPage);
router.post('/',authController.registerData);

module.exports = router;