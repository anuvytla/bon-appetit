var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var router = express.Router();
const Customer = require('../models/customer');

// setup passport authentication with username & password.
passport.use(new LocalStrategy(async function verify(username, password, callback) {
  // Find the customer by username.
  const customer = await Customer.findOne({ where: { email: username } });
  // Return error if user can not be found.
  if(customer === null) {
    callback(null, false, { message: 'Incorrect username.' });
  } else {
    // login if the password matches.
    if(password === customer.password) {
      callback(null, customer);
    } else {
      // fail login if the password doesn't match.
      callback(null, false, { message: 'Incorrect password.' });
    }
  }
}));

// Serialize to save user to session.
passport.serializeUser(function(customer, cb) {
  process.nextTick(function() {
      cb(null, { customerId: customer.customerId, email: customer.email });
  });
});

// Serialize to read user from session.
passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
      return cb(null, user);
  });
});

// authenticate user with username and password using passport.
router.post("/login/password", passport.authenticate('local', { failureMessage: true }), function (req, res) {
  if (!req.user) {
    req.session.isLoggedIn = false;
  } else {
    req.session.isLoggedIn = true;    
    req.session.customerId = req.user.customerId;
  }
  res.json(req.session.isLoggedIn);
});

// logout user.
router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      // redirect to home page.
      res.redirect('/');
    });
});

// Signup
router.post('/signup', async function(req, res, next) {
  // Insert new customer into the DB.
    const newCustomer = await Customer.create({
        'name': req.body.name,
        'email': req.body.email,
        'phone': req.body.phone,
        'password': req.body.password
      });
      // Login with newly created customer
      var user = {
        customerId: newCustomer.customerId,
        email: newCustomer.email
      };
      req.login(user, function(err) {
        if (err) { 
          return next(err); 
        }
        req.session.isLoggedIn = true;
        req.session.customerId = req.user.customerId;
        res.json(true);
      });
  });

module.exports = router;
