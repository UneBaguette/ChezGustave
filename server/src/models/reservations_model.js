const mongoose = require('mongoose');

// Définition du shema reservation
const reservation_schema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    chef_cuisine: { type: Boolean, default: false },
    visite: { type: Date },
    logement_id: { type: Number, required: true }, // Identifiant du logement
    user_id: { type: Number, required: true }, // Identifiant de l'utilisateur
    rating: { type: Number } // Note de la réservation
  });

const Reservation_model = mongoose.model('Reservation', reservation_schema);

module.exports = Reservation_model;