const { Router } = require('express');
<<<<<<< HEAD
const {Restaurant, Product, Review, User} = require('../database/my-sql/schemas/index');
=======
const Restaurant = require('../database/mySQL/schemas/Restaurant');
const Product = require('../database/mySQL/schemas/Product');
const multer = require('multer');
const fs = require('fs');
const Reviews = require('../database/mySQL/schemas/Review');
const User = require('../database/mySQL/schemas/User');
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87

const router = Router();

router.post('/restaurantsMenu', async (req, res) => {
  try {
    const { resId, menuItems } = req.body;

    const restaurant = await Restaurant.findByPk(resId);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    for (const item of menuItems) {
<<<<<<< HEAD
      const newProduct = await Product.create({
        ...item,
        restaurantId: resId, // Set the restaurantId when creating the product
      });
      productIds.push(newProduct.id);
=======
      await Product.create(item);
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
    }

    res.status(200).json({ message: 'Menu items added successfully' });
  } catch (error) {
    console.error('Error adding menu items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/restaurants', async (req, res) => {
  const { name, address, description, ownerId, image } = req.body;
<<<<<<< HEAD
  const user = await User.findByPk(ownerId);
  const resDB = await Restaurant.findOne({ where: { name: name } });
=======
  console.log(req.body);
  const resDB = await Restaurant.findOne({where: { name }});
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
  if (resDB) {
    res.status(400).send({ msg: 'Restaurant already exists' });
  }
  await Restaurant.create({
    name,
    address,
    description,
    image,
    ownerId,
  });
<<<<<<< HEAD
  await user.addRestaurant(newRestaurant);
=======
  // fs.unlinkSync(req.file.path);
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
  res.send(201);
});

router.get('/restaurantsMenu/:resId', async (req, res) => {
  try {
    const { resId } = req.params;
<<<<<<< HEAD
    const products = await Product.findAll({ where: { restaurantId: resId } });
=======
    const products = await Product.find({where: { restaurantId: resId }});
    if (products.length === 0) {
      return res.status(200).json([]);
    }
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
    res.json(products);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/restaurant/:resId', async (req, res) => {
  try {
    const { resId } = req.params;
<<<<<<< HEAD
=======
    console.log(`Fetching restaurant with ID: ${resId}`);

>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
    const rest = await Restaurant.findByPk(resId);
    if (!rest) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(rest);
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/restaurants/:ownerId', async (req, res) => {
  try {
    const { ownerId } = req.params;
<<<<<<< HEAD
    const restaurants = await Restaurant.findAll({ where: { ownerId } });
=======
    const restaurants = await Restaurant.findAll({where: { ownerId }});
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
    if (restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants found' });
    }
    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/restaurant/getReviews/:resId', async (req, res) => {
  try {
    const { resId } = req.params;
<<<<<<< HEAD
    const restaurant = await Restaurant.findOne({ where: { id: resId } });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
=======
    const restaurant = await Restaurant.findOne({where: { id: resId }});
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    };
    const reviews = await Reviews.findAll({where: {resId}});
    if (reviews.length) {
      res.status(200).json(reviews);
    } else {
      res.status(200).json([]);
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
    }

    const reviews = await Review.findAll({ where: { resId } });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: `Error while getting reviews` });
  }
});

module.exports = router;
