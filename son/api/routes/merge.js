const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const friendsRouter = require('./friends');

router.use('/accounts',authRouter);
router.use('/friends',friendsRouter);


module.exports = router;

