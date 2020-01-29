const dashRenderer = require('../renderers/dashboard');
const myFriendsRenderer = require('../renderers/myfriends');
module.exports.dashboardPage = function(req,res,next) {
    if(req.isAuth){
        let data = {userId: req.userId,username: req.username};
        let response = dashRenderer(data);
        res.type('.html');
        res.send(response);
    }
    else {
        res.redirect('/login');
    }
}

module.exports.myFriendsPage = async function(req,res,next) {
    if(req.isAuth){
        let data = {userId: req.userId,username: req.username};
        let response = myFriendsRenderer(data);
        res.type('.html');
        res.send(response);
    }
    else {
        res.redirect('/login');
    }
}