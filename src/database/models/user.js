const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const PhoneSchema = new Schema({
  numero: String,
  ddd: String
});

const UserSchema = new Schema({
  id: mongoose.Types.ObjectId,
  nome: String,
  email: String,
  senha: String,
  phone: String,
  token: String,
  telefones: [ PhoneSchema ],
  ultimo_login: { type: Date, default: Date.now },
}, { timestamps: true });


UserSchema.pre('save', next => {
  this.ultimo_login = Date.now;

  if (this.isModified('senha')) {
    bcrypt.hash(this.senha, process.env.BCRYPT_SALT_ROUNDS, (err, hash) => {
      if (err) return next(err);

      this.senha = hash;
      next();
    });
  }
});

UserSchema.methods.comparePassword = passwordCandidate => {
  bcrypt.compare(passwordCandidate || '', this.senha, (err, res) => {
    if (res) return true;
  });
};

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);