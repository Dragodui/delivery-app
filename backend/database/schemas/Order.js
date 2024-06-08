const mongoose = require('mongoose');
const Product = require('./Product');

const OrderSchema = new mongoose.Schema({
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: Product }],
  date: { type: mongoose.Schema.Types.Date, default: Date.now },
  restaurantName: { type: mongoose.Schema.Types.String },
});

module.exports = mongoose.model('orders', OrderSchema);
