const router = require("express").Router();
var authRouter = require("../routes/auth");
var apiController = require("./apiController");
const menuItems = require("../utils/items");
const { Customer, Reservation } = require("../models");
// const {User} = require('../models');
// const {Todo} = require('../models');

// renders signup/landing page
router.get("/", async (req, res) => {
  if (req.session.isLoggedIn) {
    let userID = '1066b85c-d35b-45f4-8731-759ec69e4130';
    let user = await Customer.findByPk(userID, {
      // include its associated Products.
      include: [{ model: Reservation }],
    });
    res.render("dashboard", {
      isLoggedIn: req.session.isLoggedIn,
      user: user.get({plain: true})
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/login", (req, res) => {
  res.render("login", {
    isLoggedIn: req.session.isLoggedIn,
  });
});

router.get("/home", (req, res) => {
  // res.render("home")
  res.render("home", {
    isLoggedIn: req.session.isLoggedIn,
  });
});

router.get("/signup", (req, res) => {
  res.render("signup", {
    isLoggedIn: req.session.isLoggedIn,
  });
});

router.get("/reservation", (req, res) => {
  if (req.session.isLoggedIn) {
    res.render("reservation", {
      isLoggedIn: req.session.isLoggedIn,
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/menu", (req, res) => {
  // [TODO] href => 2 places (main.js called from user, menu.js called from place_order)
  if (req.session.isLoggedIn) {
    res.render("menu", {
      appetizerItems: JSON.parse(menuItems).appetizerItems,
      mainItems: JSON.parse(menuItems).mainItems,
      dessertItems: JSON.parse(menuItems).dessertItems,
      isLoggedIn: req.session.isLoggedIn,
      orderPlaced: req.session.orderPlaced,
    });
    req.session.orderPlaced = false;
  } else {
    res.redirect("/login");
  }
});

router.use("/auth", authRouter);
router.use("/", apiController);

module.exports = router;
