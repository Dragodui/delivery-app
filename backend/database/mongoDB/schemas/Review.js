const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  rate: {
    type: mongoose.SchemaTypes.Number,
    required: true,
  },
  opinion: {
    type: mongoose.SchemaTypes.String,
    required: true,
    default: '',
  },
  resId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  userId: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  resIdAndUserId: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('reviews', ReviewSchema);
