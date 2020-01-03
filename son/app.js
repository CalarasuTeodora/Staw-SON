const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const app = express();


app.use(bodyParser.json());

let serv;
app.use('/',indexRouter);
app.use('/static',express.static(path.join(__dirname,'public')));
app.use('/login',authRouter);


mongoose.connect('mongodb://localhost:27017/son_db',{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    serv = app.listen(3000);
    console.log('Listening to port 3000');
})
.catch(err => console.log(err))
