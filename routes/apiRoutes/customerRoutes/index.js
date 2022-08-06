const router = require('express').Router();

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

module.exports = router;