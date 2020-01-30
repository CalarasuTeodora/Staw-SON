const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Friend = require('../../models/friend');

const networks = ['facebook', 'lastfm', 'twitter'];
var Twitter = require('twitter');
var lastfmAPI = require('lastfmapi');

async function getFacebookFriends(userid, user) {
    fr = await Friend.find({
        userId: userid,
        network: 'facebook'
    });

    fr.forEach(u => {
        user.friends.push({
            name: u.firstname,
            image: '',
            friends: []
        })
    });

    return user
}

var lfm = new lastfmAPI({
    api_key: process.env.LASTFM_KEY,
    secret: process.env.LASTFM_SECRET
});

function getLastFmFriends(id, curr, maxim, user = null) {
    return new Promise(async (resolve, cancel) => {
        if (curr == maxim) {
            resolve(user);
        }

        lfm.user.getFriends({
            user: id,
            api_key: process.env.LASTFM_KEY
        }, async function (err, scrobbles) {
            for (u of scrobbles.user) {
                const da = await getLastFmFriends(u.name, curr + 1, maxim, {
                    name: u.name,
                    image: u.image[1]['#text'],
                    friends: []
                })

                user.friends.push(da)
            }

            resolve(user);
        });
    })
}



function getTwitterFriends(id, curr, maxim, user = null) {
    return new Promise(async (resolve, cancel) => {
        var client = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN,
            access_token_secret: process.env.TWITTER_ACCESS_SECRET
        });

        if (curr == maxim) {
            resolve(user);
        }

        client.get('friends/list.json', {
            user_id: id
        }, async function (error, result, response) {
            if (!error) {
                for (u of result.users) {
                    const da = await getTwitterFriends(u.id_str, curr + 1, maxim, {
                        id: u.id,
                        name: u.name,
                        img: u.profile_image_url,
                        friends: []
                    })

                    user.friends.push(da)
                }

                resolve(user)

            } else {
                console.log(id, error)
            }
        });
    });
}
router.get('/new_better_best/', async function (req, res) {
    const network = req.query.network;
    if (!networks.includes(network)) {
        res.status(404);
        return res.json({
            msg: 'Invalid network'
        });
    }

    const user = await User.findById(req.userId);

    try {
        let friends;
        switch (network) {
            case 'facebook':
                friends = await getFacebookFriends(user._id, {
                    name: '',
                    image: '',
                    friends: []
                });
                break;
            case 'lastfm':
                friends = await getLastFmFriends(user.accounts.get('lastfm'), 0, 4, {
                    name: user.accounts.get('lastfm'),
                    image: '',
                    friends: []
                });
                break;
            case 'twitter':
                friends = await getTwitterFriends(user.accounts.get('twitter'), 0, 2, {
                    id: user.accounts.get('twitter'),
                    name: user.username,
                    image: '',
                    friends: []
                });
                break;
            default:
                break;
        }

        res.status(200);
        return res.json(friends);
    } catch (e) {
        console.log(e);
        res.status(500);
        return res.json({
            msg: e.message
        });
    }

});


router.get('/:network', async function(req,res) {
    const network = req.params.network;
    if(!networks.includes(network)) {
        res.status(404);
        return res.json({msg: 'Invalid network'});
    }
    try {
        const requestedUserId = req.query.userId || req.userId;
        const foundUser = await User.findById(requestedUserId);
        const userNetwork = foundUser.accounts.get(network);

        const networkFriends = foundUser.populate('friends','email',{network},async function(err,userFriendsId){
            const friendsIdentifier = userFriendsId.friends.map(friend => friend.email);
            //const filter = `accounts.${network}`;
            let friends;
            switch(network) {
                case 'facebook':
                    friends = await User.find({'accounts.facebook' : {$in: friendsIdentifier}});
                    break;
                case 'lastfm':
                    friends = await User.find({'accounts.lastfm' : {$in: friendsIdentifier}});
                    break;
                case 'twitter':
                    friends = await User.find({'accounts.twitter' : {$in: friendsIdentifier}});
                    break;
                default:
                    break;

            }
            friends = friends.map(friend => {
                return {...friend._doc,password : null}
            });
            res.status(200);
            return res.json({data: friends});

        });
    }
    catch(e) {
        console.log(e);
        res.status(500);
        return res.json({msg: e.message});
    }

});


module.exports = router;