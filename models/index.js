const Customer = require('./customer');
const Reservation = require('./reservation');
const Order = require('./order');

// Customer and Order table relationship
Order.belongsTo(Customer, {
    foreignKey: 'customerId',
});

// Customer and Order table relationship
Customer.hasMany(Order, {
    foreignKey: 'customerId',
    onDelete: 'CASCADE',
});

Reservation.belongsTo(Customer, {
    foreignKey: 'customerId',
});

Customer.hasMany(Reservation, {
    foreignKey: 'customerId',
    onDelete: 'CASCADE',
});

module.exports = {
    Customer,
    Reservation,
    Order,
}