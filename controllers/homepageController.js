const router = require('express').Router();
var authRouter = require('../routes/auth');
// const {User} = require('../models');
// const {Todo} = require('../models');

// renders signup/landing page
router.get('/', (req,res) => {
    res.render('partials/login', {
        isLoggedIn: req.session.isLoggedIn,
    });
});

router.get('/login', (req,res) => {
    res.render('partials/login', {
        isLoggedIn: req.session.isLoggedIn,
    });
});

router.get('/signup', (req,res) => {
    res.render('partials/signup', {
        isLoggedIn: req.session.isLoggedIn,
    });
});

router.get('/reservation', (req,res) => {
    res.render('partials/reservation', {
        isLoggedIn: req.session.isLoggedIn,
    });
});

router.get('/menu', (req,res) => {
    res.render('partials/menu', {
        isLoggedIn: req.session.isLoggedIn,
    });
});

router.use('/api', authRouter);


module.exports = router;