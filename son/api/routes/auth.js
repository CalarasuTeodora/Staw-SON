const express = require('express');
const router = express.Router();

const User = require('../../models/user');

router.post('/signupviaform',(req,res,next) => {
    let formData = req.fields;
    console.log(formData);
    res.json(formData);
})

module.exports = router;