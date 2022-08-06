const router = require('express').Router();

const {
    Reservation
} = require('../../../models');

router.get('/', async (req, res) => {
    try{
        const reservations = await Reservation.findAll();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error });
    }  
});


router.post('/', async (req, res) => {
    try{
        const newReservation = await Reservation.create(req.body);
        res.json(newReservation);
    } catch (error) {
        res.status(500).json({ error });
    }  
});


router.get('/:reservationId', async (req, res) => {
    try{
        const reservation = await Reservation.findByPk(req.params.reservationId);

        if (!reservation) {
            return res.status(404).json({ error: "No Matching Reservation Found!"});
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ error });
    }  
});

module.exports = router;



