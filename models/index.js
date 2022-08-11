const Customer = require('./customer');
const Reservation = require('./reservation');
const Order = require('./order');

Order.belongsTo(Customer, {
    foreignKey: 'customerId',
});

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