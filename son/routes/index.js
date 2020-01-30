const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const settingsController = require('../controllers/settingsController');
router.get('/settings',settingsController.settingsPage);
router.get('/myfriends',indexController.myFriendsPage);
router.get('/',indexController.dashboardPage);

module.exports = router;