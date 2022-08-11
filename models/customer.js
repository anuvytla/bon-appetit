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
        },
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