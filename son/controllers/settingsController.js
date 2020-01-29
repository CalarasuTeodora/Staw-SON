const settingsRenderer = require('../renderers/settings');

module.exports.settingsPage = function(req,res,next) {
    if(req.isAuth){
        let data = {userId: req.userId,username: req.username};
        let response = settingsRenderer(data);
        res.type('.html');
        res.send(response);
    }
    else {
        res.redirect('/login');
    }
}