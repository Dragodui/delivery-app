const mongoose = require('mongoose');
const Product = require('./Product');

const OrderSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: Product }],
});

module.exports = mongoose.model('orders', OrderSchema);
