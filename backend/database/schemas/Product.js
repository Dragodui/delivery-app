const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  price: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  quantity: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  image: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  description: {
    type: mongoose.SchemaTypes.String,
    required: true,
  }
});

module.exports = mongoose.model('products', ProductSchema);
