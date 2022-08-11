const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Order extends Model {}

Order.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        customerId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'customers',
                key: 'customerId',
            },
        },
        order: {
            type: DataTypes.TEXT('long'),
            allowNull: false,
            validate: {
                notNull: true,
            },
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },  
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'orders',
    }
);

module.exports = Order;