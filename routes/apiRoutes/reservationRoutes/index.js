const router = require('express').Router();
const date = require('date-and-time');
const { Op } = require('sequelize');

const {
    Reservation
} = require('../../../models');

const max_reservations = 10;
const reservation_window = 30;

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
        let customerId = req.user.customerId;
        let { partySize, reservationDate, reservationTime } = req.body;
        let dt = date.parse(reservationDate, 'YYYY-MM-DD');
        let dateTime = date.parse(reservationTime, 'HH:mm');
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
        if(count < max_reservations){
            const newReservation = await Reservation.create({
                customerID: customerId,
                reservationDate: dt,
                reservationTime: reservationTime,
                partySize: partySize
            });
            res.json(newReservation);
        }else {
            res.status(403).json( "Reservations are full at this time" );
        }
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

router.put('/:id', (req, res) => {
    // update a reservation by its `id` value
    // Calls the update method on the Reservation model

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

router.delete('/:id', async (req, res) => {
    // delete one reservation by its `id` value
    try {
      const reservation = await Reservation.destroy({
        where: {
            reservationId: req.params.id
        }
      });
  
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



