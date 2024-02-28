const mongoose = require('mongoose');



// Définition du schéma notes rating / notes
const ratingSchema = new mongoose.Schema({
  rated: { type: Number, min: 0, max: 5, required: true },
  text: { type: String },
  logement_id: { type: String, required: true }, // Identifiant du logement
  reservation_id: { type: String, required: true }, // Identifiant de la réservation
  user_id: { type: String, required: true } // Identifiant de l'utilisateur
});

// Création du modèle à partir du schéma
const Rating = mongoose.model('Rating', ratingSchema);





module.exports = Rating;
