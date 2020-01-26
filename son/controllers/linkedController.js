var passport = require('passport');
var request = require('request-promise');
var lastfmAPI = require('lastfmapi');
const User = require('../models/user');
const Friend = require('../models/friend');
const jwt = require('jsonwebtoken');
var Twitter = require('twitter');

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
        console.log(user.friends);

        ///// NEEDS FIXING
        let friends = user.friends;
        results.forEach(result => {
            result = result.id;
            let found = false;
            for(let friend of friends) {
                console.log(friend.id.toString());
                if (friend.id.toString() == result) {
                    found = true;
                    break;
                }
            }
            if(!found) {
                user.friends.push(result);
            }
        });
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
        consumer_key: 'IpMP87uFLlMHTQD832S7uQIaF',
        consumer_secret: 'eyQ7AcdJiYA8XFDLpP5NOFqSLOHnB2xOFP2pq4zuwO9Xd8B0Zi',
        access_token_key: '1134355939782549504-Twu0BNVtzPhVRInZedM4ISiPO1b0k3',
        access_token_secret: 'pK02kg5lfFxwHJm2HLsvLvOq6wJr0yWf1jZM16CZgtHJs'
      });
      
      var params = {user_id: req.user.id};
      client.get('friends/list.json', params, function(error, tweets, response){
        if (!error) {
            syncTwitter(req.userId, req.user, tweets.users); 
        }
      });


    res.redirect('/');
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
            return console.log('Well something went wront here at lastfm', err);

        }
        console.log(friends);
        
        console.log(friends.user.registered)
        res.json({
            lastFMFriends: friends,
            lastFMUserInfo: req.user
        })

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
        user.friends = [...new Set(user.friends.concat(results.map(result => result.id)))];
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