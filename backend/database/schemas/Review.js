const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  rate: {
    type: mongoose.SchemaTypes.Number,
    required: true,
    unique: false,
  },
  opinion: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
    default: '',
  },
  resId: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
  userId: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: false,
  },
});

module.exports = mongoose.model('reviews', ReviewSchema);
