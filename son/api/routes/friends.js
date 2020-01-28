const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const networks = ['facebook','lastfm','twitter'];

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