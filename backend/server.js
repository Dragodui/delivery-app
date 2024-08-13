const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
require('./database/index.js');
const authRoutes = require('./routes/auth.js');
const MongoStore = require('connect-mongo');
const jwt = require('jsonwebtoken');
const resRoute = require('./routes/restaurants.js');
const cartRoute = require('./routes/cart.js');
const ordersRoute = require('./routes/orders.js');
const productRoute = require('./routes/products.js');
const userRoute = require('./routes/user.js');
const deliveryRoute = require('./routes/delivery.js');

const cors = require('cors');

const app = express();// pril
const PORT = process.env.PORT || 5000;
app.use(express.json());
const mongoStore = MongoStore.create({
  mongoUrl: 'mongodb://localhost:27017/todos-test-app',
});

app.use(
  session({
    secret: 'amogus',
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { secure: true },
  }),
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

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
