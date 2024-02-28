// routes/reservation_route.js

const express = require('express');
const router = express.Router();
// Importation du contorller de reservation
const reservation_controller = require('../controllers/reservation_controller');



// Route pour créer une nouvelle réservation
router.post('/ajouter-reservation', reservation_controller.create_reservation);

// Route pour obtenir toutes les réservations
router.get('/all-reservation', reservation_controller.get_all_reservations)

// Route pour récupérer les détails d'une réservation par son id
router.get('/get-reservation-details/:id', reservation_controller.get_reservation_details)

// route pour mettre à jour les détails d'une réservation par son id
router.put('/update-reservation-details/:id', reservation_controller.update_reservation_details);

// Route pour mettre à jour toutes les réservations
router.put('/update-all-reservations', reservation_controller.update_all_reservations);

// Route pour supprimer une réservation par son ID
router.delete('/delete-reservation/:id', reservation_controller.delete_reservation);

// Route pour supprimer toutes les réservations
router.delete('/delete-all-reservations', reservation_controller.delete_all_reservations);

// Route pour récupérer les notes d'une réservation par son ID
router.get('/get-reservation-rating/:id', reservation_controller.get_reservation_rating);





module.exports = router;