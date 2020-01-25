const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');


router.get('/',indexController.dashboardPage);

module.exports = router;