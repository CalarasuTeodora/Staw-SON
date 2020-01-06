const express = require('express');
const router = express.Router();
const {body,validationResult} = require('express-validator');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

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