const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, 'root', process.env.DATABASE_PASSWORD, {
  host: parseInt(process.env.DATABASE_HOST),
  dialect: 'mysql', 
});

module.exports = sequelize;