var passport = require('passport');
var request = require('request-promise');
var lastFMApi = require('lastfmapi');
const User = require('../models/user');
const Friend = require('../models/friend');
const jwt = require('jsonwebtoken');
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

async function syncFB(user, fbData) {
    try {
        console.log(user);
        console.log(user.accounts)
        user.accounts.set('facebook',fbData.id);
        const results = await Promise.all(fbData.friends.data.map(friend => {
            return Friend.findOneAndUpdate({userId: user.id, network: 'facebook', email: friend.id},{userId: user.id, network: 'facebook', email: friend.id, firstname: friend.name},
             {upsert: true,setDefaultsOnInsert: true});
        }))
        user.friends = results.map(result => result.id);
        user.save();
    }
    catch(e) {
        console.log(e);
    }
}

exports.facebookLogin = function(req, res, next) {
    passport.authenticate('facebook')(req, res,next);

}

exports.facebookReturn = function(req, res, next) {
    passport.authenticate('facebook', {successRedirect: '/linked/fb/info', failureRedirect: '/'})(req, res,next)
}

exports.facebookInfo = async function(req,res) {
    //console.log(req.user);
    console.log(req.user._json.id);
    console.log(req.user._json.name);
    console.log(req.user._json.picture);
    console.log(req.user._json.email); 
    console.log(req.user._json.friends.data) // returneaza numele si id-ul prietenilor
    
    try {
        const foundUser = await User.findOne({email: req.user._json.email});
        if(!foundUser) {
            return res.redirect('/');
        }
        const token = jwt.sign({userId: foundUser.id,email: foundUser.email},'cheiedesemnarejonule');
        res.cookie('authToken',token,{httpOnly: true});
        syncFB(foundUser,req.user._json);
    }
    catch(e) {
        console.log(e);
    }
    finally {
        res.redirect('/');
    }




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

      //res.json(req.user)

}