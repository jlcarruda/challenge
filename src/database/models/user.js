const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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


UserSchema.pre('save', function(next) {
  if (!this.isModified('senha')) return next();

  bcrypt.hash(this.senha, 10, (err, hash) => {
    if (err) return next(err);

    this.senha = hash;
    next();
  });
});

UserSchema.methods.comparePassword = async function(passwordCandidate) {
  return await bcrypt.compare(passwordCandidate || '', this.senha);
};

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);