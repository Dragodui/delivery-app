const sequelize = require('../config/database');
const Product = require('./Product');
const Order = require('./Order');
const Restaurant = require('./Restaurant');
const Review = require('./Review');
const User = require('./User');

Restaurant.hasMany(Product, { foreignKey: 'restaurantId', as: 'menu' });
Product.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Restaurant, { foreignKey: 'ownerId', as: 'restaurants' });
Restaurant.belongsTo(User, { foreignKey: 'ownerId' });

User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId' });

Restaurant.hasMany(Review, { foreignKey: 'resId', as: 'reviews' });
Review.belongsTo(Restaurant, { foreignKey: 'resId' });

Order.belongsToMany(Product, { through: 'OrderProducts', as: 'products' });
Product.belongsToMany(Order, { through: 'OrderProducts', as: 'orders' });

User.belongsToMany(Product, { through: 'UserProducts', as: 'Products' });
Product.belongsToMany(User, { through: 'UserProducts', as: 'Users' });

module.exports = {
  sequelize,
  Product,
  Order,
  Restaurant,
  Review,
  User,
};
