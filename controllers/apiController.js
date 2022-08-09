const router = require('express').Router();
const {Customer, Order} = require('../models');
const menuItems = require('../utils/items')

router.get('/items', async (req, res) => {
  if(!req.session.isLoggedIn){
      res.status(401).json({error: 'You must be logged in to do that'});
  }
  res.json(menuItems);  
});

router.post('/orders', async (req, res) => {
  if(!req.session.isLoggedIn){
      res.status(401).json({error: 'You must be logged in to do that'});
  }
  console.log(req.body.order,)
  console.log(req.body.totalPrice,)
  // TODO: need session user id from auth
  // console.log(req.session.user.id,) 

  try {
      const newOrder = await Order.create({
          order: req.body.order,
          totalPrice: req.body.totalPrice,
        //   customerId: req.session.user.id,
      });
      req.session.orderPlaced = true;
      req.session.totalPrice = req.body.totalPrice;
      res.json(newOrder);
  } catch (error) {
      console.error(error);
      res.status(500).json({error});
  }

});


module.exports = router;