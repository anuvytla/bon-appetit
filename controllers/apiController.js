const router = require('express').Router();
const {Customer, Order} = require('../models');
const menuItems = require('../utils/items')

// Get all menu items and its details
router.get('/items', async (req, res) => {
  if(!req.session.isLoggedIn){
      res.status(401).json({error: 'You must be logged in to do that'});
  }
  res.json(menuItems);  
});

// This is called when you place an order
router.post('/orders', async (req, res) => {
  if(!req.session.isLoggedIn){
      res.status(401).json({error: 'You must be logged in to do that'});
  }
  
  try {
      const newOrder = await Order.create({
          order: req.body.order,
          totalPrice: req.body.totalPrice,
          customerId: req.session.customerId,
      });
      req.session.orderPlaced = true;
      req.session.totalPrice = req.body.totalPrice;
      res.json(newOrder);
  } catch (error) {     
      res.status(500).json({error});
  }

});

// This is used while displaying the order details on the profile page
router.get('/orders', async (req, res) => {
    if(!req.session.isLoggedIn){
        res.status(401).json({error: 'You must be logged in to do that'});
    }
    try {
        const orders = await Order.findAll({ where: { customerId: req.session.customerId } });    
        res.json(orders)
    } catch (error) {
        res.status(500).json({error});
    }
});



module.exports = router; 