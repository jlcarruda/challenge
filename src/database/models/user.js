const mongoose = require('mongoose');
const validators = require('mongoose-validators');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const PhoneSchema = new Schema({
  numero: { type: String, validate: [
    validators.isNumeric({ message: "o campo {PATH} não é válido" }),
    validators.isLength({ message: "o campo {PATH} não é válido" }, 8, 9)
  ]},
  ddd: { type: String, validate: [
    validators.isNumeric({ message: "o campo {PATH} não é válido" }),
    validators.isLength({ message: "o campo {PATH} não é válido" }, 2)
  ]}
});

const UserSchema = new Schema({
  nome: { type: String, required: [true, "o campo {PATH} é obrigatório"] },
  email: {
    type: String,
    validate: validators.isEmail({ message: "o campo {PATH} não é válido" }),
    unique: [true, "o campo {PATH} contém um registro já cadastrado"],
    required: [true, "o campo {PATH} é obrigatório"]
  },
  senha: { type: String, required: [true, "o campo {PATH} é obrigatório"] },
  telefones: [ PhoneSchema ],
  ultimo_login: { type: Date, default: Date.now },
  token: String
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
  return await bcrypt.compare(passwordCandidate, this.senha);
};

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);