var passport = require('passport');
var request = require('request-promise');
var lastFMApi = require('lastfmapi');


exports.lastFMLogin = function (req,res,next){
    passport.authenticate('lastfm')(req, res,next);
}

exports.lastFMReturn = function(req, res, next) {
    passport.authenticate('lastfm', {successRedirect: '/linked/lastfm/info', failureRedirect: 'error'})(req, res,next)
}


exports.lastFMInfo = function(req,res) {
    var lfm = new LastfmAPI({
        api_key : process.env.LASTFM_KEY,
        secret : process.env.LASTFM_SECRET
    });

    var mySessionCreds = {
        username : req.user.name,
        key : req.user.key
    };

    lfm.setSessionCredentials(mySessionCreds.username, mySessionCreds.key);
    lfm.user.getFriends(params, callback(err, friends))

    res.json(req.user)

}

exports.facebookLogin = function(req, res, next) {
    passport.authenticate('facebook')(req, res,next);

}

exports.facebookReturn = function(req, res, next) {
    passport.authenticate('facebook', {successRedirect: '/linked/fb/info', failureRedirect: 'error'})(req, res,next)
}

exports.facebookInfo = function(req,res) {
    //console.log(req.user);
    console.log(req.user._json.id);
    console.log(req.user._json.name);
    console.log(req.user._json.picture);
    console.log(req.user._json.email); 
    console.log(req.user._json.friends.data) // returneaza numele si id-ul prietenilor
    
   /* const options = {
        method: 'GET',
        uri: `https://graph.facebook.com/v2.8/3288174314543630`,
        qs: {
          access_token: req.user.accessToken,
          fields: 'email'
        }
    };
    
    request(options).then(fbRes => {
    console.log(fbRes);
    res.json(fbRes);
      })*/

      res.json(req.user)

}