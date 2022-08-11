const router = require('express').Router();
const bcrypt = require('bcryptjs');

const {
    Customer
} = require('../../../models');

// GET '/api/customers' route to return all customers in json format.
router.get('/', async (req, res) => {
    try{
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error });
    }  
});

// POST '/api/customers' route to create a new customer.
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

// POST '/api/customers/customerId' route to get customer details by their id.
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

// update a customer by its `id` value
// Calls the update method on the Customer model
router.put('/:id', (req, res) => {
    // construct update object with the fields we need to update.
    customer_update = {};
    if(req.body.name) {
        customer_update.name = req.body.name;
    }

    if(req.body.email) {
        customer_update.email = req.body.email;
    }

    if(req.body.password) {
        customer_update.password = await bcrypt.hash(req.body.password, 8);
    }

    if(req.body.phone) {
        customer_update.phone = req.body.phone;
    }
    // Update the customer object with the fields.
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
        // return error message if the customer is not found.
        res.status(404).json({ message: 'No customer found with this id!' });
        return;
      }
  
      res.status(200).json(customer);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;