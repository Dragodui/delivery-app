const mongoose = require('mongoose');
mongoose
  .connect('mongodb://127.0.0.1:27017/delivery-logs')
  .then(() => console.log('Connected to mongoDB'))
  .catch((err) => console.log(err));
