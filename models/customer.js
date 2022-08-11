const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const Reservation = require('./reservation');

// Customer table to store cusomer details.
class Customer extends Model {}

Customer.init (
    {
        // Primary key
        customerId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            },
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
        },
        // passowrd length should be 8 chars.
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [8],
        }
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'customers',
    }
);


module.exports = Customer;