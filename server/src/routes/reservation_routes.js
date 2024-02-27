// routes/reservation_route.js

const express = require('express');
const router = express.Router();
// Importation du contorller de reservation
const reservation_controller = require('../controllers/reservation_controller');



// Endpoint pour créer une nouvelle réservation
router.post('/ajouter-reservation', reservation_controller.create_reservation);

// Endpoint pour obtenir toutes les réservations
router.get('/all-reservation', reservation_controller.get_all_reservations)





module.exports = router;