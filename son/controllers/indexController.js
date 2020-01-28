const dashRenderer = require('../renderers/dashboard');

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