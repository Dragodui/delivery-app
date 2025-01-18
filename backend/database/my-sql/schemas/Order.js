const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  restaurantName: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'waiting for deliveryman',
  },
  deliverymanId: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
});

module.exports = Order;
