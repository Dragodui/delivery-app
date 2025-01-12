const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Restaurant = sequelize.define('Restaurant', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    address: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    ownerId: { type: DataTypes.INTEGER, allowNull: false },
}, {
    timestamps: false,
});

module.exports = Restaurant;
