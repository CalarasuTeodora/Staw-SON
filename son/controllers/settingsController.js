const settingsRenderer = require('../renderers/settings');
const User = require('../models/user');
const mongoose = require('mongoose');

module.exports.settingsPage = function(req,res,next) {
    if(req.isAuth){
        let _data = {userId: req.userId,username: req.username};
        User.findOne({_id: mongoose.Types.ObjectId(_data.userId)})
        .then((data) => {
        let response = settingsRenderer(data);
        res.type('.html');
        res.send(response);        
        })
        .catch((err) => {
            res.redirect('/login');    
        });
    }
    else {
        res.redirect('/login');
    }
}   