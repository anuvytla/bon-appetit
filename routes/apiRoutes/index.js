const router = require('express').Router();
const customerRoutes = require('./customerRoutes');
const reservationRoutes = require('./reservationRoutes');

// map '/api/customers' for customer routes.
router.use('/customers', customerRoutes);
// map '/api/reservations' for reservation routes.
router.use('/reservations', reservationRoutes);

module.exports = router;