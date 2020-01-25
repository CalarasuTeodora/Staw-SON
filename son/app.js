const path = require('path');
const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
var LastFMStrategy = require('passport-lastfm')
var twitterStrategy = require('passport-twitter')
const formidableMiddleware = require('express-formidable');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const indexRouter = require('./routes/index');
const apiRouter = require('./api/routes/merge')
const cookieParser = require('cookie-parser');
const isAuth = require('./middleware/isAuth');
const linkedApps = require('./api/routes/linkedApps')
const app = express();

var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;


passport.use(new twitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: "http://localhost:3000/linked/twitter/return"
},
function(token, tokenSecret, profile, cb) {
    
    return cb(null, profile); }
  ));



passport.use(new LastFMStrategy({
    api_key: process.env.LASTFM_KEY,
    secret: process.env.LASTFM_SECRET,
    callbackURL: 'http://localhost:3000/linked/lastfm/return'},
    function(req, profile, done){
        return done(null,profile);
    }));

passport.use(new Strategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: '/linked/fb/return',
    profileFields: ['id', 'displayName', 'photos', 'email','friends'],
    scope: ['user_friends', 'email']
  },
  
  function(accessToken, refreshToken, profile, cb) {
    profile.accessToken=accessToken
    return cb(null, profile);
  }));

  passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});



app.use(cookieParser());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(isAuth);
app.use(formidableMiddleware());
app.use(passport.initialize());
app.use(passport.session());


let serv;


app.use('/',indexRouter);
app.use('/api',apiRouter);
app.use('/linked', linkedApps);
app.use('/static',express.static(path.join(__dirname,'public')));
app.use('/login',loginRouter);
app.use('/register',registerRouter);



mongoose.connect('mongodb://localhost:27017/son_db',{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    serv = app.listen(3000);
    console.log('Listening to port 3000');
})
.catch(err => console.log(err))
