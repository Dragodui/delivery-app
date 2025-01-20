const request = require('supertest');
const express = require('express');
const cartRouter = require('../routes/cart'); // Убедитесь, что путь правильный
const { User, Product } = require('../database/my-sql/schemas/index');
const logDB = require('../utils/logs');

const app = express();
app.use(express.json());
app.use(cartRouter);

// Мокаем модели и функции
jest.mock('../database/my-sql/schemas/index', () => ({
  User: {
    findByPk: jest.fn(),
    addProduct: jest.fn(),
    removeProduct: jest.fn(),
    setProducts: jest.fn(),
    getProducts: jest.fn(),
  },
  Product: {
    findByPk: jest.fn(),
  },
}));

jest.mock('../utils/logs', () => jest.fn());

describe('Cart API', () => {
  describe('POST /cart/addToCart', () => {
    test('should add product to cart successfully', async () => {
      const mockUser = { 
        id: 1, 
        addProduct: jest.fn(), 
        getProducts: jest.fn().mockResolvedValue([]) 
      };
      const mockProduct = { id: 1, name: 'Test Product' };

      User.findByPk.mockResolvedValue(mockUser);
      Product.findByPk.mockResolvedValue(mockProduct);

      const response = await request(app)
        .post('/cart/addToCart')
        .send({ userId: 1, productId: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Product added to cart successfully',
        cart: [],
      });
    });

    test('should return error if user or product not found', async () => {
      Product.findByPk.mockResolvedValue(null); // Продукт не найден

      const response = await request(app)
        .post('/cart/addToCart')
        .send({ userId: 1, productId: 1 });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Product not found' });
    });

    test('should return error if userId or productId is missing', async () => {
      const response = await request(app)
        .post('/cart/addToCart')
        .send({ userId: 1 }); // productId отсутствует

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'User ID and Product ID are required' });
    });
  });

  describe('GET /cart/:userId', () => {
    test('should return user cart successfully', async () => {
      const mockUser = { id: 1, getProducts: jest.fn().mockResolvedValue([]) };
      User.findByPk.mockResolvedValue(mockUser);

      const response = await request(app)
        .get('/cart/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ cart: [] });
    });

    test('should return error if user not found', async () => {
      User.findByPk.mockResolvedValue(null); // Пользователь не найден

      const response = await request(app)
        .get('/cart/1');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'User not found' });
    });
  });

  describe('POST /cart/removeFromCart', () => {
    test('should remove product from cart successfully', async () => {
      const mockUser = { 
        id: 1, 
        removeProduct: jest.fn(), 
        getProducts: jest.fn().mockResolvedValue([]) 
      };
      const mockProduct = { id: 1, name: 'Test Product' };

      User.findByPk.mockResolvedValue(mockUser);
      Product.findByPk.mockResolvedValue(mockProduct);

      const response = await request(app)
        .post('/cart/removeFromCart')
        .send({ userId: 1, productId: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Product removed from cart successfully',
        cart: [],
      });
    });

    test('should return error if user or product not found', async () => {
      User.findByPk.mockResolvedValue(null); // Пользователь не найден

      const response = await request(app)
        .post('/cart/removeFromCart')
        .send({ userId: 1, productId: 1 });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'User not found' });
    });
  });

  describe('POST /cart/clearCart', () => {
    test('should clear cart successfully', async () => {
      const mockUser = { 
        id: 1, 
        setProducts: jest.fn() 
      };
      User.findByPk.mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/cart/clearCart')
        .send({ userId: 1 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Cart cleared successfully', cart: [] });
    });

    test('should return error if user not found', async () => {
      User.findByPk.mockResolvedValue(null); // Пользователь не найден

      const response = await request(app)
        .post('/cart/clearCart')
        .send({ userId: 1 });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'User not found' });
    });

    test('should return error if userId is missing', async () => {
      const response = await request(app)
        .post('/cart/clearCart')
        .send({}); // userId отсутствует

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'User ID is required' });
    });
  });
});