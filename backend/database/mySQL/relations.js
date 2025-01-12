const User = require('./schemas/User');
const Restaurant = require('./schemas/Restaurant');
const Cart = require('./schemas/Cart');
const CartItem = require('./schemas/CartItem');
const Order = require('./schemas/Order');
const Review = require('./schemas/Review');

const createRelations = async() => {
    User.hasMany(Restaurant, { foreignKey: 'userId', as: 'orders' });
    Restaurant.belongsTo(User, { foreignKey: 'userId', as: 'userId' });

    User.hasMany(Order, { foreignKey: 'ownerId', as: 'restaurants' });
    Restaurant.belongsTo(User, { foreignKey: 'ownerId', as: 'ownerId' });
    
    User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
    Restaurant.belongsTo(User, { foreignKey: 'userId', as: 'userId' });

    Cart.hasMany(CartItem, { foreignKey: 'cartId', as: 'items' });
    CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

}

module.exports = createRelations;