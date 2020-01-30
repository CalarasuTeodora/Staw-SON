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
    let filters = req.query.filters.split(',');
    let search = req.query.search.split(',');
    const networks = ['facebook','twitter','lastfm'];
    let filterFriendsData = function(results,filters,search) {
        
        if(filters.length == 0 || search.length == 0 ||filters[0] == '' || search[0] == '') {
            return [results[0].data,results[1].data,results[2].data];
        }
        function filter(friendsData) {
            return friendsData.filter(friendData => {
                if(!filters.includes('hobbies') && !filters.includes('username')) {
                    return true;
                }
                if(filters.includes('hobbies')) {
                    for(let searchTerm of search) {
                        if(friendData.hobbies.includes(searchTerm)) {
                            return true;
                        }
                    }
                }
                if (filters.includes('username')) {
                    for(let searchTerm of search) {
                        if(searchTerm == friendData.username) {
                            return true;
                        }
                    }
                }
                return false;
            })
        }

        let fb = filter(results[0].data);
        let tw = filter(results[1].data);
        let lf = filter(results[2].data);
        return [fb,tw,lf];
    }
    let computeFriendsData = function(results) {
        results = filterFriendsData(results,filters,search);
        let fbFriends = results[0];
        let twitterFriends = results[1];
        let lastfmFriends = results[2];
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
        if(filters.includes('network') && (search.includes('facebook') || search.includes('twitter') || search.includes('lastfm'))) {
            let networkFilters = [];
            if(search.includes('facebook')) {
                networkFilters.push('facebook');
            }
            if(search.includes('twitter')) {
                networkFilters.push('twitter');
            }
            if(search.includes('lastfm')) {
                networkFilters.push('lastfm');
            }
            userData = userData.filter(user => {
                for(let net of networkFilters) {
                    if(user.networks[net] != 'friends') {
                        return false;
                    }
                }
                return true;
            })
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

