const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');
const Reservation = require('./reservation');

class Customer extends Model {}

Customer.init (
    {
        // foreign key in reservation table
        customerId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            // type: DataTypes.UUID,
            // defaultValue: DataTypes.UUIDV4,
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
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'customers',
    }
);


module.exports = Customer;