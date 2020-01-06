//const User = require('../models/user')
const registerRenderer = require('../renderers/register');
const loginRenderer = require('../renderers/login');

exports.loginPage = function(req,res) {
    if(req.isAuth) {
        res.redirect('/');
    }
    else {
        let data = {};
        let htmlPage = loginRenderer(data);
        res.type('.html');
        res.send(htmlPage);
    }
}



exports.registerPage = function(req,res) {
    if(req.isAuth) {
        res.redirect('/');
    }
    else {
        let data = {};
        let htmlPage = registerRenderer(data);
        res.type('.html');
        res.send(htmlPage);
    }
}

exports.registerData = function(req,res) {
    res.send('register data');
}