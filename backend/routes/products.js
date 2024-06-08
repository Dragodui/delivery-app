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

router.post('/products/edit/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;
    console.log(updateData);

    if (!productId) {
      return res.status(404).json({ message: 'Product id is required.' });
    }

    if (!updateData) {
      return res.status(400).json({ message: 'No update data provided.' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.delete('/products/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(404).json({ message: 'Product id is required.' });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
