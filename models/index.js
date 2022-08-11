const Customer = require('./customer');
const Reservation = require('./reservation');
const Order = require('./order');

// Each order belongs to a customer. linked by foreign key customerId
Order.belongsTo(Customer, {
    foreignKey: 'customerId',
});

// Customer can have many orders. linked by foreign key customerId
// All orders should be deleted if the customer is deleted
Customer.hasMany(Order, {
    foreignKey: 'customerId',
    onDelete: 'CASCADE',
});

// Each reservation belongs to a customer. linked by foreign key customerID
Reservation.belongsTo(Customer, {
    foreignKey: 'customerID',
});

// Customer can have many reservations. linked by foreign key customerID
// All reservations should be deleted if the customer is deleted
Customer.hasMany(Reservation, {
    foreignKey: 'customerID',
    onDelete: 'CASCADE',
});

module.exports = {
    Customer,
    Reservation,
    Order,
}