const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

router.post('/username',function(req,res,next){
 
    if(req.isAuth){
        let userId = req.userId;
        let uname = req.username;
        console.log(uname);
        let new_uname = req.fields.username;
        console.log(new_uname);
        User.findOne({username: new_uname})
        .then((found) => {
            if(!found){
                User.findOne({_id : mongoose.Types.ObjectId(userId)})
                .then((user) => {
                    console.log(user);
                    return Object.assign(user, {username: new_uname});
                })
                .then( (model) => {
                    console.log(model);
                    return model.save();
                })
                .then((updateModel) => {
                    console.log(updateModel);
                    const token = jwt.sign({userId: updateModel.id,email: updateModel.email, username:updateModel.username},'cheiedesemnarejonule');
                    res.cookie('authToken',token);
                    res.status(200);
                    res.end();
                })
                .catch( (err) => {
                    console.log(err);
                    res.status(404);
                    res.end();
                });
            }
            else{
                res.status(404);
                res.end();
            }
        }).catch((err) => {
            res.status(404);
            res.end();
        })
    }
});

router.post('/hobbies',function(req,res,next){

    if(req.isAuth){
        let userId = req.userId;
        let uname = req.username;
        let new_hobbies = JSON.parse(req.fields.hobbies);
        User.findOne({_id : mongoose.Types.ObjectId(userId)})
                .then((user) => {
                    // console.log(user);
                    console.log(new_hobbies);
                    return Object.assign(user, {hobbies: new_hobbies});
                })
                .then( (model) => {
                    console.log(model);
                    return model.save();
                })
                .then((updateModel) => {
                    console.log(updateModel);
                    res.status(200);
                    res.end();
                })
                .catch( (err) => {
                    // console.log(err);
                    res.status(404);
                    res.end();
                });
    }
});

module.exports = router;