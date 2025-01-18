const { DataTypes } = require('sequelize');
const sequelize = require('../index.js');

const User = sequelize.define('User', {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    cart: { type: DataTypes.JSON, defaultValue: null },
});

module.exports = User;
