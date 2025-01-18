const { DataTypes } = require('sequelize');
const sequelize = require('../index');


const CartItem = sequelize.define('CartItem', {
    cartId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  }, {
    timestamps: false,
  });
  
  module.exports = CartItem;