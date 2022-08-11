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
            validate: {
                pwAtLeast8char(password) {
                    if (password.length < 8) {
                        throw new Error ('choose a password that is at least 8 characters');
                    }
                }
            }
            
        }
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'customers',
        hooks: {
            beforeCreate: async (customer) => {
                customer.email = customer.email.toLowerCase();
                return customer;
            },
            beforeUpdate: (customer) => {
                customer.email = customer.email.toLowerCase();
                return customer;
            },
        }
    }
);


module.exports = Customer;