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

// Each reservation belongs to a customer. linked by foreign key customerID
Reservation.belongsTo(Customer, {
    foreignKey: 'customerId',
});

// Customer can have many reservations. linked by foreign key customerID
// All reservations should be deleted if the customer is deleted
Customer.hasMany(Reservation, {
    foreignKey: 'customerId',
    onDelete: 'CASCADE',
});

module.exports = {
    Customer,
    Reservation,
    Order,
}