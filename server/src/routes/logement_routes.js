// Importation du module express
const express = require('express');
// Création du router
const router = express.Router();
// Importation du controller pour ajouter un logement
const logement_controller = require('../controllers/logement_controller');



// Route pour ajouter un logement
router.post('/ajouter-logement', logement_controller.ajouter_logement);

// Route pour obtenir tous les details d'un logement par son id 
router.get('/get-logement-details', logement_controller.get_logement_details);

//
router.put('/update-logement-details/:id', logement_controller.update_logement_details);

// Route pour supprimer un logement par son id
router.delete('/delete-logement/:id', logement_controller.delete_logement);

// Route pour récupérer les réservations d'un logement par son id
router.get('/reservation-logement/:id', logement_controller.get_reservations_of_logement);






// Exportation du router
module.exports = router;
