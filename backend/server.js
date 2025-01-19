const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
require('./database/mongo-db/index.js');
const authRoutes = require('./routes/auth.js');
const MongoStore = require('connect-mongo');
const resRoute = require('./routes/restaurants.js');
const cartRoute = require('./routes/cart.js');
const ordersRoute = require('./routes/orders.js');
const productRoute = require('./routes/products.js');
const userRoute = require('./routes/user.js');
const deliveryRoute = require('./routes/delivery.js');
const logRoute = require('./routes/logs.js');
require('./database/my-sql/index.js');

require('dotenv').config();

const cors = require('cors');

const app = express(); // pril
const PORT = process.env.PORT || 5000;
app.use(express.json());
const mongoStore = MongoStore.create({
  mongoUrl: 'mongodb://127.0.0.1:27017/todos-test-app',
});

app.use(
  session({
    secret: 'amogus',
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { secure: true },
  })
);
//api маршруты
app.use(cors());
app.use(authRoutes);
app.use(resRoute);
app.use(ordersRoute);
app.use(cartRoute);
app.use(productRoute);
app.use(userRoute);
app.use(deliveryRoute);
app.use(logRoute);

app.listen(PORT, async () => {
  console.log(`listening on port ${PORT}`);
});
