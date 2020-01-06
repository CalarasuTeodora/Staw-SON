//const User = require('../models/user')
const registerRenderer = require('../renderers/register');

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
    let data = {};
    let htmlPage = registerRenderer(data);
    res.type('.html');
    res.send(htmlPage);
}

exports.registerData = function(req,res) {
    res.send('register data');
}