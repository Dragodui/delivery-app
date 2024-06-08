const { Router } = require('express');
const Product = require('../database/schemas/Product');

const router = Router();

router.get('/products/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      res.status(404).json({ message: 'Product id is required.' });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
