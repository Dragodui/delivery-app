const sequelize = require('./index.js');
const User = require('./schemas/User.js');
const Review = require('./schemas/Review.js');
const Restaurant = require('./schemas/Restaurant.js');
const Product = require('./schemas/Product.js');
const Order = require('./schemas/Order.js');

(async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Tables created.');
    } catch (err) {
        console.error('Error sync:', err.message);
    } finally {
        await sequelize.close();
    }
})();
