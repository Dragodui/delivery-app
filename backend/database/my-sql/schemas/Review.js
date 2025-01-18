const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
  rate: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  opinion: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  resIdAndUserId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Review;
