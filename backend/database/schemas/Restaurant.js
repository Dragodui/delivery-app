const mongoose = require('mongoose');
const Product = require('./Product');
const Review = require('./Review');

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  address: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  // image: {
  //   data: Buffer,
  //   contentType: mongoose.SchemaTypes.String,
  // },
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
  image: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  ownerId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Review,
      default: [],
      required: true,
    }
  ]
});

module.exports = mongoose.model('restaurants', RestaurantSchema);
