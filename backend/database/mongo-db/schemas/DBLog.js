const mongoose = require('mongoose');

const DBLogSchema = new mongoose.Schema({
  date: { type: mongoose.Schema.Types.Date, default: Date.now },
  message: { type: mongoose.Schema.Types.String },
});

module.exports = mongoose.model('dblogs', DBLogSchema);
