const router = require('express').Router();
var authRouter = require('../routes/auth');
var apiController = require('./apiController');
const menuItems = require('../utils/items')
// const {User} = require('../models');
// const {Todo} = require('../models');

// renders signup/landing page
router.get('/', (req,res) => {
    res.render('login', {
        isLoggedIn: req.session.isLoggedIn,
    });
});

router.get('/login', (req,res) => {
    res.render('login', {
        isLoggedIn: req.session.isLoggedIn,
    });
});

router.get('/signup', (req,res) => {
    res.render('signup', {
        isLoggedIn: req.session.isLoggedIn,
    });
});

router.get('/reservation', (req,res) => {
    res.render('reservation', {
        isLoggedIn: req.session.isLoggedIn,
    });
});

router.get('/menu', (req,res) => {
    // [TODO] href => 2 places (main.js called from user, menu.js called from place_order)
    req.session.orderPlaced = true;
    res.render('menu', {
        appetizerItems: JSON.parse(menuItems).appetizerItems,
        isLoggedIn: req.session.isLoggedIn,
        orderPlaced: req.session.orderPlaced,
    });
});

router.use('/api', authRouter);
router.use('/api', apiController);

module.exports = router;