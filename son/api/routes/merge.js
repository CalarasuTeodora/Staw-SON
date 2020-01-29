const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const authRouter = require('./auth');
const friendsRouter = require('./friends');
const settingsRouter = require('./settings')

router.use('/accounts',authRouter);
router.use('/friends',friendsRouter);
router.use('/settings',settingsRouter);
router.get('/myfriends',async function(req,res,next) {
    let filters = req.query.filters;
    let search = req.query.search;
    const networks = ['facebook','twitter','lastfm'];
    let computeFriendsData = function(results) {
        let fbFriends = results[0].data;
        let twitterFriends = results[1].data;
        let lastfmFriends = results[2].data;
        let userData = [];
        for(friend of fbFriends) {
            userData.push({
                user: friend,
                networks: {
                    facebook: 'friends',
                    twitter:'notfriends',
                    lastfm:'notfriends'
                }
            })
        }
        for(friend of twitterFriends) {
            let found = false;
            for(friendCompare of userData) {
                if(friend.email == friendCompare.user.email) {
                    found = true;
                    friendCompare.networks.twitter = 'friends';
                    break;
                }
            }
            if(!found) {
                userData.push({
                    user: friend,
                    networks: {
                        twitter: 'friends',
                        facebook: 'notfriends',
                        lastfm: 'notfriends'
                    }
                })
            }
        }
        for(friend of lastfmFriends) {
            let found = false;
            for(friendCompare of userData) {
                if(friend.email == friendCompare.user.email) {
                    found = true;
                    friendCompare.networks.lastfm = 'friends';
                    break;
                }
            }
            if(!found) {
                userData.push({
                    user: friend,
                    networks: {
                        lastfm: 'friends',
                        twitter: 'notfriends',
                        facebook: 'notfriends'
                    }
                })
            }
        }
        for(user of userData) {
            for(let network of networks) {
                if(!user.user.accounts[network]) {
                    user.networks[network] = 'none';
                }
            }
        }
        return userData;
    }

    try {
        let results = await Promise.all(networks.map(network => {
            return fetch(`http://localhost:3000/api/friends/${network}?userId=${req.userId}`);
        }));
        results = await Promise.all(results.map(result => result.json()));
        let friendsData = computeFriendsData(results);

        res.json(friendsData);
    }
    catch(e) {
        res.status(500);
        res.json({msg:e.stack});
    }
});

module.exports = router;

