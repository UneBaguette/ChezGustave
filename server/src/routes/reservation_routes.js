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


module.exports = router;