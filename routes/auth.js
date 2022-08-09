var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var router = express.Router();
const Customer = require('../models/customer');

// passport-local tutorial: https://www.passportjs.org/tutorials/password/signup/

const dummy_user = {
  id: 1,
  username: "restaurant@test.com",
    password: "password"
}

passport.use(new LocalStrategy(function verify(username, password, callback) {
  console.log("local",username,password);
    if(username === dummy_user.username && password === dummy_user.password) {
      callback(null, dummy_user);
    } else {
        callback(null, false, { message: 'Incorrect username or password.' });
    }
}));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
    return cb(null, user);
  });
});

router.get('/login', function(req, res, next) {
  // [TODO] remove isLoggedIn after fixes in authentication
  req.session.isLoggedIn = true;
  res.json('login!!!');
 
});

// [TODO] username password check is missing, res object not given
// [TODO] Save session details and set isLoggedIn to true/false
router.post("/login/password", function (req, res, next) {
  passport.authenticate(
    "local",
    // {
    //     successRedirect: '/',
    //     failureRedirect: '/login',
    // }
    // Custom callback for front end messages
    function (err, user) {
      if (!user) {
        console.log("Invalid credentials!");
        req.session.isLoggedIn = false;
        // res.redirect("/login");
      } else {
        console.log("Success!");
        req.session.isLoggedIn = true;
        // res.redirect("/reservation");
      }
      res.json(req.session.isLoggedIn)
    }
  )(req, res);
});

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.isLoggedIn = false;
    res.redirect("/");
  });
});

router.get('/signup', function(req, res, next) {
    res.json('sign up!!!');
});

router.post('/signup', async function(req, res, next) {
  const newCustomer = await Customer.create({
        'name': req.body.name,
        'email': req.body.email,
        'phone': req.body.phone,
        'password': req.body.password
  });
  var user = {
    id: newCustomer.customerId,
        username: newCustomer.email
  };
  // [TODO] Signup should fail if email already exists in db
      req.login(user, function(err) {
        if (err) { return next(err); }
        req.session.isLoggedIn = true;
        res.json(true);
  });
});

router.get('/home', function(req, res, next) { 
  req.session.isLoggedIn = true;
  res.json('home!!!'); 
});

module.exports = router;
