const mongoose = require('mongoose');
const Product = require('./Product');
const ProductSchema = require('./Product').schema;

const OrderSchema = new mongoose.Schema({
  products: [ProductSchema],
  date: { type: mongoose.Schema.Types.Date, default: Date.now },
  restaurantName: { type: mongoose.Schema.Types.String },
  status: {
    type: mongoose.Schema.Types.String,
    default: 'waiting for deliveryman',
  },
  deliverymanId: { type: mongoose.Schema.Types.String, default: '' },
});

module.exports = mongoose.model('orders', OrderSchema);
