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

  describe('Password Comparison', () => {
    it('should compare password correctly', async () => {
      let user = new UserModel(mocksUser.user);
      await user.save();

      isValidPassword = await user.comparePassword(mocksUser.user.senha);
      expect(isValidPassword).toBeTruthy();
    });
  });

  describe('Record Validation', () =>{
    [
      [ 'should reject if password does not exist', mocksUser.user_no_password, "o campo senha é obrigatório"],
      [ 'should reject if email does not exist', mocksUser.user_no_email, "o campo email é obrigatório"],
      [ 'should reject if nome does not exist', mocksUser.user_no_nome, "o campo nome é obrigatório"],
      [ 'should reject if email is invalid', mocksUser.user_invalid_email, "o campo email não é válido"],
      [ 'should reject if numero is invalid', mocksUser.user_invalid_numero, "o campo numero não é válido"],
      [ 'should reject if ddd is invalid', mocksUser.user_invalid_ddd, "o campo ddd não é válido"]
    ].forEach( testArray => {
      it(testArray[0], async () => {
        let user = new UserModel(testArray[1]);

        await expect(user.validate()).rejects.toThrow(testArray[2]);
      });
    });
  });

  describe('Record Uniqueness', () => {
    it('should reject if user has email already registered', async () => {
      let user = new UserModel(mocksUser.user);

      await expect(user.save()).rejects.toThrow('E11000 duplicate key error');
    });
  });
});
