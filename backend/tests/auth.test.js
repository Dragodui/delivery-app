const request = require('supertest');
const express = require('express');
const authRouter = require('../routes/auth'); // Убедитесь, что путь правильный
const { User } = require('../database/my-sql/schemas/index');
const { hashPassword } = require('../utils/helpers');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const app = express();
app.use(express.json());
app.use(authRouter);

// Мокаем модели и функции
jest.mock('../database/my-sql/schemas/index', () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
  },
}));

jest.mock('../utils/logs', () => jest.fn());
jest.mock('jsonwebtoken');

describe('Auth API', () => {
  describe('POST /register', () => {
    test('should register a user successfully', async () => {
      const mockUser = { id: 1, email: 'test@example.com', name: 'Test User', role: 'user', password: hashPassword('password') };
      User.findOne.mockResolvedValue(null); // Пользователь не существует
      User.create.mockResolvedValue(mockUser); // Создаем пользователя

      const response = await request(app)
        .post('/register')
        .send({ email: 'test@example.com', name: 'Test User', role: 'user', password: 'password' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'User created successfully', userId: mockUser.id });
    });

    test('should return an error if user already exists', async () => {
      User.findOne.mockResolvedValue({ id: 1 }); // Пользователь существует

      const response = await request(app)
        .post('/register')
        .send({ email: 'test@example.com', name: 'Test User', role: 'user', password: 'password' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'User already exists' });
    });

    test('should return validation errors', async () => {
      const response = await request(app)
        .post('/register')
        .send({ email: 'invalid-email', password: 'pw' }); // Ошибочные данные

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('POST /login', () => {
    test('should login user successfully and return token', async () => {
      const mockUser = { id: 1, email: 'test@example.com', password: hashPassword('password') };
      User.findOne.mockResolvedValue(mockUser); // Пользователь найден
      jwt.sign.mockReturnValue('mockedToken'); // Мокаем jwt.sign

      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ token: 'mockedToken' });
    });

    test('should return error if user does not exist', async () => {
      User.findOne.mockResolvedValue(null); // Пользователь не найден

      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password' });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'User does not exist' });
    });

    test('should return error if password is incorrect', async () => {
      const mockUser = { id: 1, email: 'test@example.com', password: hashPassword('password') };
      User.findOne.mockResolvedValue(mockUser); // Пользователь найден

      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'wrongpassword' });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'Password is incorrect' });
    });
  });

});