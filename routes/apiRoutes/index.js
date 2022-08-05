const router = require('express').Router();
const customerRoutes = require('./customerRoutes');
const reservationRoutes = require('./reservationRoutes');


router.use('/customers', customerRoutes);
router.use('/reservations', reservationRoutes);

module.exports = router;