const Reservation = require('../models/reservation_model'); // Importe le modèle de réservation

async function delete_user(req, res, next) {
    try {
        // Supprimer toutes les réservations associées à cet utilisateur
        await Reservation.deleteMany({ user: req.params.userId });

        next();
    } catch (error) {
        next(error);
    }
};



module.exports = delete_user;
