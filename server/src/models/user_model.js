const mongoose = require('mongoose');

// Définition du schéma
const user_schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  tel: { type: String, required: true },
  password: { type: String, required: true },
  is_admin: { type: Boolean, default: false }
});

// Création du modèle à partir du schéma
const User_model = mongoose.model('User', user_schema);

module.exports = User_model;
