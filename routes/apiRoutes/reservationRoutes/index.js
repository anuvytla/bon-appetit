const router = require('express').Router();
const date = require('date-and-time');
const { Op } = require('sequelize');

const {
    Reservation
} = require('../../../models');

// Max reservations that can be made in 1-hour time range.
const max_reservations = 10;
// time in minutes for  each reservation.
const reservation_window = 30;

// GET '/api/reservations' to returns all reservations.
router.get('/', async (req, res) => {
    try{
        const reservations = await Reservation.findAll();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error });
    }  
});


// POST '/api/reservations' to create a new reservation.
router.post('/', async (req, res) => {
    try{
        // Get customer if from the session user.
        let customerId = req.user.customerId;
        // deconstruct reservation details.
        let { partySize, reservationDate, reservationTime } = req.body;
        let dt = date.parse(reservationDate, 'MM/DD/YYYY');
        let dateTime = date.parse(reservationTime, 'HH:mm');
        // Find the total number of reservations in 1 hour window, from 30 mins before the requested slot to 30 mins after.
        let minTime = date.addMinutes(dateTime, -reservation_window);
        let maxTime = date.addMinutes(dateTime, reservation_window);
        let {count} = await Reservation.findAndCountAll({
            where: {
                reservationDate: {
                    [Op.like]: reservationDate
                },
                reservationTime : {
                    [Op.between]:[date.format(minTime, 'HH:mm'), date.format(maxTime, 'HH:mm')]
                }
            }
        });
        // If total reservation less than maximum create a new reservation.
        if(count < max_reservations){
            const newReservation = await Reservation.create({
                customerID: customerId,
                reservationDate: dt,
                reservationTime: reservationTime,
                partySize: partySize
            });
            res.json(newReservation);
        }else {
            // Send an error saying reservations are full.
            res.status(403).json( "Reservations are full at this time" );
        }
    } catch (error) {
        res.status(500).json({ error });
    }  
});

// '/api/reservations/reservationId' to fetch single reservation by its id.
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

//api/reservations/id/
router.put('/:id', (req, res) => {
    // update a reservation by its `id` value
    // Calls the update method on the Reservation model

    // Get the details needed to update.
    reservation_update = {};
    if(req.body.partySize) {
        reservation_update.partySize = req.body.partySize;
    }

    if(req.body.reservationDate) {
        reservation_update.reservationDate = req.body.reservationDate;
    }

    if(req.body.reservationTime) {
        reservation_update.reservationTime = req.body.reservationTime;
    }
    // Update the details in the DB.
    Reservation.update(
        reservation_update,
      {
        // Gets the reservation based on the id given in the request parameters
        where: {
            reservationId: req.params.id,
        },
      }
    )
      .then((updatedReservation) => {
        // Sends the updated reservation as a json response
        res.json(updatedReservation);
      })
      .catch((err) => res.json(err));
});

// '/api/reservations/id'
router.delete('/:id', async (req, res) => {
    // delete one reservation by its `id` value
    try {
      const reservation = await Reservation.destroy({
        where: {
            reservationId: req.params.id
        }
      });
      // return an error if the reservation is not found.
      if (!reservation) {
        res.status(404).json({ message: 'No reservation found with this id!' });
        return;
      }
  
      res.status(200).json(reservation);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;



