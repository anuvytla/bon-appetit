var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var router = express.Router();
const Customer = require('../models/customer');

// passport-local tutorial: https://www.passportjs.org/tutorials/password/signup/

passport.use(new LocalStrategy(async function verify(username, password, callback) {
  const customer = await Customer.findOne({ where: { email: username } });
  console.log(customer);
  if(customer === null) {
    callback(null, false, { message: 'Incorrect username.' });
  }

  if(password === customer.password) {
    callback(null, customer);
  } else {
    callback(null, false, { message: 'Incorrect password.' });
  }
}));

passport.serializeUser(function(customer, cb) {
  process.nextTick(function() {
      cb(null, { customerId: customer.customerId, email: customer.email });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
      return cb(null, user);
  });
});

// [TODO] username password check is missing, res object not given
// [TODO] Save session details and set isLoggedIn to true/false
router.post("/login/password", passport.authenticate('local', { failureMessage: true }), function (req, res) {
  if (!req.user) {
    console.log("Invalid credentials!");
    req.session.isLoggedIn = false;
  } else {
    req.session.isLoggedIn = true;
  }
  res.json(req.session.isLoggedIn);
});

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});

router.post('/signup', async function(req, res, next) {
    const newCustomer = await Customer.create({
        'name': req.body.name,
        'email': req.body.email,
        'phone': req.body.phone,
        'password': req.body.password
      });
      var user = {
        customerId: newCustomer.customerId,
        email: newCustomer.email
      };
      req.login(user, function(err) {
        if (err) { return next(err); }
        req.session.isLoggedIn = true;
        res.json(true);
      });
  });

module.exports = router;
