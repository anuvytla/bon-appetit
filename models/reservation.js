const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Reservation extends Model {}

Reservation.init (
    {
        reservationId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        partySize: {
            type: DataTypes.INTEGER,
        },
        reservationDate: {
            type: DataTypes.DATE,
        },
        reservationTime: {
            type: DataTypes.TIME,
        },
        customerID: {
            type: DataTypes.UUID,
            foreignKey: true,
        },
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'reservations',
    }
);

module.exports = Reservation;