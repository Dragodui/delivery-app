const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_NAME, 'root', process.env.DATABASE_PASSWORD, {
  host: parseInt(process.env.DATABASE_HOST),
  dialect: 'mysql', 
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Contected to mySQL.');
  } catch (error) {
    console.error('Connection error:', error.message);
  }
})();

module.exports = sequelize;
