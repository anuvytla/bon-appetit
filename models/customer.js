const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Customer extends Model {}

Customer.init (
    {
        customerId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
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