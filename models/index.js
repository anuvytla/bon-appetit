const Customer = require('./customer');
const Reservation = require('./reservation');

Customer.hasMany(Reservation, {
    foreignKey: 'CustomerId',
    onDelete: 'CASCADE',
});
// Reservation.belongsTo(Customer);

module.exports = {
    Customer,
    Reservation,
}