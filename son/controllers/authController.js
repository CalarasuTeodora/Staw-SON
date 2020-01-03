//const User = require('../models/user')

exports.loginPage = function(req,res) {
    res.set('Content-Type','text/html');
    res.status(200);
    res.send(`Pagina login`);
}

exports.loginData = function(req,res) {
    res.status(200);
    res.send('Pagina date login!');
}

exports.registerPage = function(req,res) {
    res.send('Register Page!');
}

exports.registerData = function(req,res) {
    res.send('register data');
}