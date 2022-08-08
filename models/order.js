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
        order: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
            },
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        customerId: {
            type: DataTypes.UUID,
            references: {
                model: 'customers',
                key: 'customerId',
            },
        }
    },
    {
        sequelize,
        timestamps: true,
        modelName: 'orders',
    }
);

module.exports = Order;