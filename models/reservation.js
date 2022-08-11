const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// Resercation table stores the details of each reservation. This is linked to customer by customerId.
class Reservation extends Model {}

Reservation.init (
    {
        // Primary key
        reservationId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
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
        // primary key for customer table 
        // customerID: {
        //     type: DataTypes.UUID,
        //     allowNull: false,
        //     foreignKey: true,
        // },
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'reservations',
    }
);

module.exports = Reservation;