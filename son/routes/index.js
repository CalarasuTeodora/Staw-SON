const express = require('express');
const router = express.Router();

router.get('/',function(req,res) {
    if(req.isAuth) {
        console.log(req.user)
        res.send(req.userId);
    }
    else {
        res.redirect('/login');
    }
});

module.exports = router;