const mongoose = require('mongoose');
const Product = require('./Product');
const Order = require('./Order');
const Restaurant = require('./Restaurant');
const Review = require('./Review');

const UserSchema = new mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  role: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
      default: [],
      required: false,
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Order,
      default: [],
      required: false,
    },
  ],
  restaurants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Restaurant,
      default: null,
      required: false,
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Review,
      default: [],
      required: false,
    },
  ],
});

module.exports = mongoose.model('users', UserSchema); //v db
