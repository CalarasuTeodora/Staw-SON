const path = require('path');
const express = require('express');
const mongoose = require('mongoose')
const formidableMiddleware = require('express-formidable');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const indexRouter = require('./routes/index');
const apiRouter = require('./api/routes/merge')
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(formidableMiddleware());

let serv;
app.use('/',indexRouter);
app.use('/api',apiRouter);
app.use('/static',express.static(path.join(__dirname,'public')));
app.use('/login',loginRouter);
app.use('/register',registerRouter);


mongoose.connect('mongodb://localhost:27017/son_db',{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    serv = app.listen(3000);
    console.log('Listening to port 3000');
})
.catch(err => console.log(err))
