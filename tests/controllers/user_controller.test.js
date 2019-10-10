require('dotenv').config();

const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');
const database = require('../../src/database');
const UserModel = require('../../src/database/models/user');
const mocksUser = require('../mocks/user.mock');

describe("User Routes", () => {
  let connection;
  let uri;
  let lastResponse;

  const req = request('localhost:5000/users');
  const signInRequest = mock => {
    return req.post("/sign_in").send({
      email: mock.email,
      senha: mock.senha
    });
  };

  const userInfoRequest = (userId, userToken) => {
    return req.get(`/${userId}`).set('Authorization', `Bearer ${userToken}`);
  };

  const signUpRequest = mock => {
    return req.post('/sign_up').send(mock);
  };

  beforeAll(async () => {
    app.init(async () => {
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
    signUpRequest(mocksUser.user).end((err, resp) => {
      expect(resp.statusCode).toEqual(201);
    });
  });

  it('should fail if already has an email registered', async () => {
    signUpRequest(mocksUser.user).end((err, resp) => {
      expect(resp.statusCode).toEqual(400);
      expect(resp.body.error).not.toBeNull();
      expect(resp.body.error).toEqual('Email já existente');
    });
  });

  it('should fail when tries to sign in with invalid credentials', async () => {
    signInRequest({ email: "", senha: "" }).end((err, resp) => {
      expect(err).toBeNull();
      expect(resp.statusCode).toEqual(401);
      expect(resp.body.error).not.toBeNull();
      expect(resp.body.error).toEqual('Usuário e/ou Senha inválidos');
    });
  });

  it('should get user information from signed user', async () => {
    signInRequest(mocksUser.user).end((err, signInResp) => {
      lastResponse = signInResp;

      userInfoRequest(signInResp.id, signInResp.token).end((err, resp) => {
        console.log(resp.statusCode, resp.body);
        expect(err).toBeNull();
        expect(resp.body.error).toBeUndefined();
        expect(resp.statusCode).toEqual(200);
      });
    });
  });
});