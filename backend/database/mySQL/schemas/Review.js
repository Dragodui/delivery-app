const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Review = sequelize.define('Review', {
    rate: { type: DataTypes.INTEGER, allowNull: false },
    opinion: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
    resId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    resIdAndUserId: { type: DataTypes.STRING, allowNull: false, unique: true },
}, {
    timestamps: false,
});

module.exports = Review;
