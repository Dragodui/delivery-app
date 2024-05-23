const { Router } = require('express');
const Restaurant = require('../database/schemas/Restaurant');
const Product = require('../database/schemas/Product');
const multer = require('multer');
const fs = require('fs');

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../frontend/src/assets/restaurants');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// router.post('/restaurants', upload.single('image'), async (req, res) => {
//   const { name, address, description, ownerId } = req.body;
//   const imageBuffer = fs.readFileSync(req.file.path);
//   console.log(req.file.filename);
//   const resDB = await Restaurant.findOne({ name: name });
//   if (resDB) {
//     res.status(400).send({ msg: 'user already exist' });
//   }
//   const newRestaurant = await Restaurant.create({
//     name,
//     address,
//     description,
//     image: imageBuffer,
//     imageUrl: `/uploads/${req.file.filename}`,
//     ownerId,
//   });
//   await newRestaurant.save();
//   fs.unlinkSync(req.file.path);
//   res.send(201);
// });

router.post('/restaurants', async (req, res) => {
  const { name, address, description, ownerId, image } = req.body;
  const resDB = await Restaurant.findOne({ name: name });
  if (resDB) {
    res.status(400).send({ msg: 'restaurant already exist' });
  }
  const newRestaurant = await Restaurant.create({
    name,
    address,
    description,
    image,
    ownerId,
  });
  await newRestaurant.save();
  // fs.unlinkSync(req.file.path);
  res.send(201);
});

router.post('/restaurantsMenu', async (req, res) => {
  try {
    const { ownerId, menuItems } = req.body;

    const restaurant = await Restaurant.findOne({ ownerId: ownerId });

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const productIds = [];

    for (const item of menuItems) {
      const newProduct = new Product(item);
      await newProduct.save();
      productIds.push(newProduct._id);
    }
    console.log(productIds)

    restaurant.menu.push(...productIds);
    await restaurant.save();

    res.status(200).json({ message: 'Menu items added successfully' });
  } catch (error) {
    console.error('Error adding menu items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/restaurantsMenu/:resId', async (req, res) => {
  try {
    const { resId } = req.params;
    console.log(resId);
    const products = await Product.find({ restaurantId: resId });
    console.log(products);
    if (products.length === 0) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(products);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/restaurants/:ownerId', async (req, res) => {
  try {
    const { ownerId } = req.params;
    const restaurant = await Restaurant.findOne({ ownerId: ownerId });
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
