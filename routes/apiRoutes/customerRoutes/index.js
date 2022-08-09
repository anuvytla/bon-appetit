const router = require('express').Router();
const bcrypt = require('bcryptjs');

const {
    Customer
} = require('../../../models');

router.get('/', async (req, res) => {
    try{
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error });
    }  
});


router.post('/', async (req, res) => {
    try{
        const newCustomer = req.body;
        newCustomer.password = await bcrypt.hash(newCustomer.password, 8);
        const createdCustomer = await Customer.create(newCustomer);
        res.json(createdCustomer);
    } catch (error) {
        res.status(500).json({ error });
    }  
});


router.get('/:customerId', async (req, res) => {
    try{
        const customer = await Customer.findByPk(req.params.customerId);

        if (!customer) {
            return res.status(404).json({ error: "No Matching Customer Found!"});
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error });
    }  
});

router.put('/:id', (req, res) => {
    // update a customer by its `id` value
    // Calls the update method on the Customer model

    customer_update = {};
    if(req.body.name) {
        customer_update.name = req.body.name;
    }

    if(req.body.email) {
        customer_update.email = req.body.email;
    }

    if(req.body.password) {
        customer_update.password = req.body.password;
    }

    if(req.body.phone) {
        customer_update.phone = req.body.phone;
    }

    Customer.update(
      customer_update,
      {
        // Gets the customer based on the id given in the request parameters
        where: {
            customerId: req.params.id,
        },
      }
    )
      .then((updatedCustomer) => {
        // Sends the updated customer as a json response
        res.json(updatedCustomer);
      })
      .catch((err) => res.json(err));
});

router.delete('/:id', async (req, res) => {
    // delete one customer by its `id` value
    try {
      const customer = await Customer.destroy({
        where: {
            customerId: req.params.id
        }
      });
  
      if (!customer) {
        res.status(404).json({ message: 'No customer found with this id!' });
        return;
      }
  
      res.status(200).json(customer);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;