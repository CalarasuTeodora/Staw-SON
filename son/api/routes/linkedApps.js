const express = require('express');
const router = express.Router();

const linkedController = require('../../controllers/linkedController');

router.get('/fb/login', linkedController.facebookLogin);
router.get('/fb/return', linkedController.facebookReturn);
router.get('/fb/info', linkedController.facebookInfo);

router.get('/lastfm/login', linkedController.lastFMLogin);
router.get('/lastfm/return', linkedController.lastFMReturn);
router.get('/lastfm/info', linkedController.lastFMInfo);




module.exports = router;
