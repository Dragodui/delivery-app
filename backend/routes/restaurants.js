const { Router } = require('express');
const {
  Restaurant,
  Product,
  Review,
  User,
} = require('../database/my-sql/schemas/index');

const router = Router();

router.post('/restaurantsMenu', async (req, res) => {
  try {
    const { resId, menuItems } = req.body;

    const restaurant = await Restaurant.findByPk(resId);

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    for (const item of menuItems) {
      const newProduct = await Product.create({
        ...item,
        restaurantId: resId, // Set the restaurantId when creating the product
      });
      productIds.push(newProduct.id);
    }

    res.status(200).json({ message: 'Menu items added successfully' });
  } catch (error) {
    console.error('Error adding menu items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/restaurants', async (req, res) => {
  const { name, address, description, ownerId, image } = req.body;
  const user = await User.findByPk(ownerId);
  const resDB = await Restaurant.findOne({ where: { name: name } });
  if (resDB) {
    res.status(400).send({ msg: 'Restaurant already exists' });
  }
  const newRestaurant = await Restaurant.create({
    name,
    address,
    description,
    image,
    ownerId,
  });
  await user.addRestaurant(newRestaurant);
  res.send(201);
});

router.get('/restaurantsMenu/:resId', async (req, res) => {
  try {
    const { resId } = req.params;
    const products = await Product.findAll({ where: { restaurantId: resId } });
    res.json(products);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/restaurant/:resId', async (req, res) => {
  try {
    const { resId } = req.params;
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
    const restaurants = await Restaurant.findAll({ where: { ownerId } });
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
    const restaurant = await Restaurant.findOne({ where: { id: resId } });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const reviews = await Review.findAll({ where: { resId } });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: `Error while getting reviews` });
  }
});

module.exports = router;
