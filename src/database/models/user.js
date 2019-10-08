"use strict";
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

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);