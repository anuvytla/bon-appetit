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
            allowNull: false,
        },
        reservationDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        reservationTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        customerID: {
            type: DataTypes.UUID,
            allowNull: false,
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