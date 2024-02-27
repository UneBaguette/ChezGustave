// routes/reservation_route.js

const express = require('express');
const router = express.Router();
// Importation du contorller de reservation
const reservation_controller = require('../controllers/reservation_controller');



// Endpoint pour récupérer les réservations d'un utilisateur
router.get('/user/:userId/reservation', reservation_controller.get_user_reservations);

// Endpoint pour créer une nouvelle réservation
router.post('/ajouter-reservation', reservation_controller.create_reservation);





module.exports = router;