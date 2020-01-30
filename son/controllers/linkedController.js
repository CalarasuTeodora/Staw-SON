var passport = require('passport');
var request = require('request-promise');
var lastfmAPI = require('lastfmapi');
const User = require('../models/user');
const Friend = require('../models/friend');
const jwt = require('jsonwebtoken');
var Twitter = require('twitter');
const mongoose = require('mongoose');


function addFriendsToUser(user,results) {
    let friends = user.friends;
        results.forEach(result => {
            result = result.id;
            let found = false;
            for(let friend of friends) {
                if (friend.toString()  == result) {
                    found = true;
                    break;
                }
            }
            if(!found) {
                user.friends.push(result);
            }
        });
}

async function syncTwitter(userId, twitterUser, twitterData) {
    try {
        const user = await User.findById(userId);
        user.accounts.set('twitter', twitterUser.id);
        const results = await Promise.all(twitterData.map(friend => {
            return Friend.findOneAndUpdate({
                userId: user.id,
                network: 'twitter',
                email: friend.id
            }, {
                userId: user.id,
                network: 'twitter',
                email: friend.id,
                firstname: friend.name
            }, {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            });
        }))
        addFriendsToUser(user,results);
        user.save();
    } catch (e) {
        console.log(e);
    }
}

exports.twitterLogin = function (req, res, next) {
    if(!req.isAuth) {
        return res.redirect('/login');
    }
    passport.authenticate('twitter')(req, res, next);
}

exports.twitterReturn = function (req, res, next) {
    passport.authenticate('twitter', {
        successRedirect: '/linked/twitter/info',
        failureRedirect: '/'
    })(req, res, next)
}

exports.twitterInfo = function (req, res) {
    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret: process.env.TWITTER_ACCESS_SECRET
      });
      
      var params = {user_id: req.user.id};
      client.get('friends/list.json', params, function(error, tweets, response){
        if (!error) {
            syncTwitter(req.userId, req.user, tweets.users); 
        }
      });


    res.redirect('/');
}

async function syncLastFM(userId, lastFMUser, lastFMData) {
    try {
        const user = await User.findById(userId);
        user.accounts.set('lastfm', lastFMUser.name);
        const results = await Promise.all(lastFMData.map(friend => {
            return Friend.findOneAndUpdate({
                userId: user.id,
                network: 'lastfm',
                email: friend.name
            }, {
                userId: user.id,
                network: 'lastfm',
                email: friend.name,
                firstname: friend.realname
            }, {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            });
        }))
        addFriendsToUser(user,results);
        user.save();
    } catch (e) {
        console.log(e);
    }
}

exports.lastFMLogin = function (req, res, next) {
    if(!req.isAuth) {
        return res.redirect('/login');
    }
    passport.authenticate('lastfm')(req, res, next);
}

exports.lastFMReturn = function (req, res, next) {
    passport.authenticate('lastfm', {
        successRedirect: '/linked/lastfm/info',
        failureRedirect: '/'
    })(req, res, next)
}


exports.lastFMInfo = function (req, res) {
    var lfFriend
    var lfm = new lastfmAPI({
        api_key: process.env.LASTFM_KEY,
        secret: process.env.LASTFM_SECRET
    });

    var mySessionCreds = {
        username: req.user.name,
        key: req.user.key
    };

    lfm.setSessionCredentials(mySessionCreds.username, mySessionCreds.key);


    lfm.user.getFriends({
        user: mySessionCreds.username,
        api_key: process.env.LASTFM_KEY

    }, function (err, friends) {
        if (err) {
            console.log('Well something went wront here at lastfm', err);
            return res.redirect('/');
        }

        syncLastFM(req.userId,req.user,friends.user);
        res.redirect('/');

    });
 

}

async function syncFB(user, fbData) {
    try {
        user.accounts.set('facebook', fbData.id);
        const results = await Promise.all(fbData.friends.data.map(friend => {
            return Friend.findOneAndUpdate({
                userId: user.id,
                network: 'facebook',
                email: friend.id
            }, {
                userId: user.id,
                network: 'facebook',
                email: friend.id,
                firstname: friend.name
            }, {
                upsert: true,
                setDefaultsOnInsert: true,
                new: true
            });
        }))
        addFriendsToUser(user, results);
        user.save();
    } catch (e) {
        console.log(e);
    }
}

exports.facebookLogin = function (req, res, next) {
    passport.authenticate('facebook')(req, res, next);

}

exports.facebookReturn = function (req, res, next) {
    passport.authenticate('facebook', {
        successRedirect: '/linked/fb/info',
        failureRedirect: '/'
    })(req, res, next)
}

exports.facebookInfo = async function (req, res) {
    /*
    console.log(req.user);
    console.log(req.user._json.id);
    console.log(req.user._json.name);
    console.log(req.user._json.picture);
    console.log(req.user._json.email);
    console.log(req.user._json.friends.data) // returneaza numele si id-ul prietenilor
    */
    try {
        const foundUser = await User.findOne({
            email: req.user._json.email
        });
        if (!foundUser) {
            return res.redirect('/');
        }
        const token = jwt.sign({
            userId: foundUser.id,
            email: foundUser.email
        }, 'cheiedesemnarejonule');
        res.cookie('authToken', token, {
            httpOnly: true
        });
        syncFB(foundUser, req.user._json);
    } catch (e) {
        console.log(e);
    } finally {
        res.redirect('/');
    }


    

    //res.json(req.user)

}