const express = require('express');
const router = express.Router();

const authRouter = require('./auth');


router.use('/accounts',authRouter);


module.exports = router;

