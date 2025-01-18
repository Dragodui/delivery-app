const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    image: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    restaurantId: { type: DataTypes.INTEGER, allowNull: false },
}, {
    timestamps: false,
});

module.exports = Product;
