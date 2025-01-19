const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  date: { type: mongoose.Schema.Types.Date, default: Date.now },
  message: { type: mongoose.Schema.Types.String },
});

module.exports = mongoose.model('logs', LogSchema);
