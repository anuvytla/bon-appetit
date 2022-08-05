const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Customer extends Model {}

Customer.init (
    {
        // foreign key in reservation table
        customerId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'customers',
    }
);

module.exports = Customer;