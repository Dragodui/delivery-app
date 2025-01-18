// index.js
const sequelize = require('./config/database');
const { User, Product, Order, Restaurant, Review } = require('./schemas');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database established successfully.');
    // await sequelize.sync({ force: true }); 
    // console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
