const { Router } = require('express');
<<<<<<< HEAD
const {Product} = require('../database/my-sql/schemas/index');
=======
const Product = require('../database/mySQL/schemas/Product');
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87

const router = Router();

router.get('/products/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      res.status(404).json({ message: 'Product id is required.' });
    }
<<<<<<< HEAD
    const product = await Product.findOne({where: {id:productId}});
=======
    const product = await Product.findByPk(productId);
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
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

    if (!productId) {
      return res.status(404).json({ message: 'Product id is required.' });
    }

    if (!updateData) {
      return res.status(400).json({ message: 'No update data provided.' });
    }

<<<<<<< HEAD
    const updatedProduct = await Product.update(updateData, {
      where: { id: productId },
      returning: true,
      plain: true,
    });
=======
    const updatedProduct = await Product.findByPkAndUpdate(
      productId,
    );
    await updatedProduct.update(updateData);
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct[1]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.delete('/products/delete/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(404).json({ message: 'Product id is required.' });
    }

<<<<<<< HEAD
    const deletedProduct = await Product.destroy({ where: { id: productId } });
=======
    const deletedProduct = await Product.findByPk(productId);
    await deletedProduct.destroy();
>>>>>>> 380407ef569966f500e44bffa978e93910d86c87
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
