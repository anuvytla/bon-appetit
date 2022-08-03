const express = require('express');
var authRouter = require('./routes/auth');
require('dotenv').config();
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }));
app.use(passport.authenticate('session'));

app.get('/', (req, res) => { res.json('Hello!!!') });
app.use('/', authRouter);

app.listen(PORT, () => console.log('Now listening'));