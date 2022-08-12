const router = require("express").Router();
var authRouter = require("../routes/auth");
const apiRoutes = require("../routes");
const apiController = require("./apiController");
const menuItems = require("../utils/items");
const { Customer, Reservation, Order } = require("../models");

// renders signup/landing page
router.get("/", async (req, res) => {
  if (req.session.isLoggedIn) {
    let userID = req.user.customerId;
    let user = await Customer.findByPk(userID, {
      // include its associated Products.
      include: [ Reservation, Order ],
    });
    // code for displaying the order history from the DB in the correct format on screen
    orderHistory = [];
    
    user.orders.forEach(order => {

      items = JSON.parse(order.order) ;

      orderDict = {"itemsJson": items, "totalPrice": order.totalPrice,
      "orderDate": order.createdAt.toString().split(" ")[0],
      "orderTime": order.createdAt.toString().split(" ")[1]
    }
      orderHistory.push(orderDict)
    }); 

    res.render("dashboard", {
      isLoggedIn: req.session.isLoggedIn,
      user: user.get({plain: true}),
      orderHistory: orderHistory,
    });
  } else {
    res.redirect("/login");
  }
});

// Render Login page
router.get("/login", (req, res) => {
  res.render("login", {
    isLoggedIn: req.session.isLoggedIn,
  });
});

// Render the home page when the user is logged in
router.get("/home", (req, res) => {
  
  if (req.session.isLoggedIn) {
    res.render("home", {
      isLoggedIn: req.session.isLoggedIn,
    });
  } else {
    res.render("login", {
      isLoggedIn: req.session.isLoggedIn,
    });
  }
});

// Render the sign up page
router.get("/signup", (req, res) => {
  res.render("signup", {
    isLoggedIn: req.session.isLoggedIn,
  });
});

// Render the reservation page if the user is logged in
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

// Render the profile page if the user is logged in
router.get("/profile", (req, res) => {
  if (req.session.isLoggedIn) {
    res.render("dashboard", {
      isLoggedIn: req.session.isLoggedIn,
    });
  } else {
    res.render("login", {
      isLoggedIn: req.session.isLoggedIn,
    });
  }
});

// Render the menu page if the user is logged in
router.get("/menu", (req, res) => {
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
