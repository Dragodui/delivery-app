const mongoose = require('mongoose');
const Product = require('./Product');


const RestaurantSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  address: {
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
  },
  menu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
      default: [],
      required: true,
    },
  ],
  ownerId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  }
});

module.exports = mongoose.model('restaurants', RestaurantSchema);
