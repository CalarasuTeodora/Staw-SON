const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const friendsRouter = require('./friends');
const settingsRouter = require('./settings')
router.use('/accounts',authRouter);
router.use('/friends',friendsRouter);
router.use('/settings',settingsRouter);
router.get('/myfriends',function(req,res,next) {
    let filters = req.query.filters;
    let search = req.query.search;
    
});

module.exports = router;

