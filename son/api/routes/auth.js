const express = require('express');
const router = express.Router();
const {body,validationResult} = require('express-validator');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

router.post('/loginviaform', (req,res,next) => {
    const email = req.fields.email;
    const password = req.fields.password;
    (async function checkUser() {
        try {
            const foundUser = await User.findOne({email: email});
            if(!foundUser) {
                throw new Error('Wrong E-mail!');
            }
            else {
                const isEqual = await bcrypt.compare(password,foundUser.password);
                if(!isEqual) {
                    throw new Error('Wrong Password!');
                }
                const token = jwt.sign({userId: foundUser.id,email: foundUser.email, username:foundUser.username},'cheiedesemnarejonule');
                res.cookie('authToken',token,{httpOnly: true});
                res.status(303);
                res.end();
            }
        }
        catch(err) {
            throw err;
        }
    })()
    .then()
    .catch(err => {
        let status = 401,error;
        if(err.message == 'Wrong E-mail!') {
            error = {
                param:'email',
                msg: err.message
            }
        }
        else if(err.message == 'Wrong Password!') {
            error = {
                param: 'password',
                msg: err.message
            }
        }
        else {
            status = 500;
        }
        res.status(status);
        res.send(error);
    }) 
});

router.post('/signupviaform', (req,res,next) => {
    let errors = [];
    if(req.fields.password.length < 5) {
        errors.push({
            param: 'password',
            msg: 'Password too short! (min 5)'
        })
    }
    else if(req.fields.password != req.fields.retypepassword) {
        errors.push({
            param:'retypepassword+password',
            msg: `Passwords don't match`
        })
    }
    if(!validateEmail(req.fields.email)) {
        errors.push({
            param: 'email',
            msg: 'Invalid E-mail!'
        })
    }
    else {
        (async function checkExistingUser() {
            const existingUser = await User.findOne({$or:[{email: req.fields.email},{username: req.fields.username}]});
            if(existingUser && existingUser.email == req.fields.email) {
                errors.push({
                    param: 'email',
                    msg: 'E-mail already in use!'
                });
            }
            if(existingUser && existingUser.username == req.fields.username) {
                errors.push({
                    param: 'username',
                    msg: 'Username already in use!'
                });
            }
        })().then( async ()=> {
            if(errors.length == 0) {
                try {
                    const hashedPassword = await bcrypt.hash(req.fields.password, 12);
                    const newUser = new User({
                        email: req.fields.email,
                        username: req.fields.username,
                        password: hashedPassword,
                    })
                    await newUser.save()
                    res.status(200).end();
                }
                catch(err) {
                    throw err;
                }
            }
            else {
                res.status(422).send(errors);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })
    }
})

module.exports = router;