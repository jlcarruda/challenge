const mongoose = require('mongoose');
const mocksUser = require('../mocks/user.mock');
const database = require('../../src/database');
const UserModel = require('../../src/database/models/user');

describe('User', () => {
  let connection;
  let uri;

  beforeAll(async () => {
    if(uri === undefined) {
      uri = await database.getMongoUri();
    }
    connection = await mongoose.connect(uri, {  useNewUrlParser: true, useUnifiedTopology: true });
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await UserModel.deleteMany({});
    await mongoose.disconnect();
  });

  describe('Validation of Password', () => {
    it('should compare password correctly', async () => {
      let user = new UserModel(mocksUser.user);
      await user.save();

      isValidPassword = await user.comparePassword(mocksUser.user.senha);
      expect(isValidPassword).toBeTruthy();
    });
  });
})
