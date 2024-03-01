const mongoose = require('mongoose');



// Fonction pour formater les dates au format français
function formatDate(date) {
    return date.toLocaleString('fr-FR');
}



// Définition du shema reservation
const reservation_schema = new mongoose.Schema({
    start_date: { type: Date, required: true, get: formatDate }, // Formatage pour la lecture
    end_date: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                const minimumDate = new Date();
                const maximumDate = new Date();
                minimumDate.setDate(minimumDate.getDate() + 7); // Minimum 1 semaine
                maximumDate.setDate(maximumDate.getDate() + 30); // Maximum 1 mois
                return value >= minimumDate && value <= maximumDate;
            },
            message: 'La date de fin doit être comprise entre 1 semaine et 1 mois à partir d\'aujourd\'hui'
        },
        get: formatDate // Formatage pour la lecture
    }, chef_cuisine: { type: Boolean, default: false },
    visite: { type: Date, get: formatDate }, // Formatage pour la lecture
    logement_id: { type: String, required: true }, // Identifiant du logement
    user_id: { type: String }, // Identifiant de l'utilisateur
    rating: { type: Number } // Note de la réservation
});



const Reservation_model = mongoose.model('Reservation', reservation_schema);

module.exports = Reservation_model;
