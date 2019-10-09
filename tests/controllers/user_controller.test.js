require('dotenv').config();

const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');
const server = require("../../src/api").app;
const database = require('../../src/database');
const UserModel = require('../../src/database/models/user');
const mocksUser = require('../mocks/user.mock');

describe("User Routes", () => {
  let connection;
  let uri;
  let express;
  let res = request('localhost:5000/users');

  beforeAll(async () => {
    app.init(async () => {
      express = server;
      uri = await database.getMongoUri();
      connection = await mongoose.connect(uri, {  useNewUrlParser: true, useUnifiedTopology: true });
      await UserModel.deleteMany({});
    });
  });

  afterAll(async () => {
    await UserModel.deleteMany({});
    await mongoose.disconnect();
  });

  it('should create a new user', async () => {
    res.post('/sign_up').send(mocksUser.user).end((err, resp) => {
      expect(resp.statusCode).toEqual(201);
    });
  });

  it('should fail if already has an email registered', async () => {
    res.post('/sign_up').send(mocksUser.user).end((err, resp) => {
      expect(resp.statusCode).toEqual(400);
      expect(resp.body.error).not.toBeNull();
      expect(resp.body.error).toEqual('Email já existente');
    });
  });

  it('should fail when tries to sign in with invalid credentials', async () => {
    res.post('/sign_in').send({
      email: mocksUser.user.email,
      senha: mocksUser.user.senha + "fake"
    }).end((err, resp) => {
      expect(resp.statusCode).toEqual(401);
      expect(resp.body.error).not.toBeNull();
      expect(resp.body.error).toEqual('Usuário e/ou Senha inválidos');
    });
  });
});