const mongoose = require('mongoose');

// Définition du schéma
const ratingSchema = new mongoose.Schema({
  rated: { type: Number, min: 0, max: 5, required: true },
  text: { type: String },
  logementId: { type: String, required: true }, // Identifiant du logement
  reservationId: { type: String, required: true }, // Identifiant de la réservation
  userId: { type: String, required: true } // Identifiant de l'utilisateur
});

// Création du modèle à partir du schéma
const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
