const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Order = sequelize.define('Order', {
    products: { type: DataTypes.JSON, allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    restaurantName: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, defaultValue: 'waiting for deliveryman' },
    deliverymanId: { type: DataTypes.STRING, defaultValue: '' },
    userId: { type: DataTypes.INTEGER, allowNull: false },
}, {
    timestamps: false,
});

module.exports = Order;
