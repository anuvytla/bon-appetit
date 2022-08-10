const router = require("express").Router();
var authRouter = require("../routes/auth");
const apiRoutes = require("../routes");
const apiController = require("./apiController");
const menuItems = require("../utils/items");
const { Customer, Reservation } = require("../models");

// renders signup/landing page
router.get("/", async (req, res) => {
  if (req.session.isLoggedIn) {
    let userID = req.user.customerId;
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
    res.render("login", {
      isLoggedIn: req.session.isLoggedIn,
    });
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
      totalPrice: req.session.totalPrice,
    });
    
    req.session.orderPlaced = false;    
  } else {
    res.render("login", {
      isLoggedIn: req.session.isLoggedIn,      
    });
  }
});

router.use("/auth", authRouter);
router.use("/", apiRoutes);
router.use("/api", apiController);

module.exports = router;
