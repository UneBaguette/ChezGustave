// Importation du module express
const express = require('express');
// Création du router
const router = express.Router();
// Importation du controller pour ajouter un logement
const logement_controller = require('../controllers/logement_controller');
// Importation du middleware multer pour les images
const upload_logements = require('../middlewares/multer_logement');


// Route pour ajouter un logement
router.post('/ajouter-logement', upload_logements.array('images'), logement_controller.ajouter_logement);

// Route pour obtenir tous les details d'un logement par son id 
router.get('/get-logement-details/:id', logement_controller.get_logement_details);

// Route pour modifier les informations d'un logement par son id 
router.put('/update-logement-details/:id', logement_controller.update_logement_details);

// Route pour mettre à jour tous les logements
router.put('/update-all-logements', logement_controller.update_all_logements);

// Route pour obtenir tous les logements
router.get('/get-all-logements', logement_controller.get_all_logements);

// Route pour supprimer un logement par son id
router.delete('/delete-logement/:id', logement_controller.delete_logement);

// Route pour supprimer tous les logements
router.delete('/delete-all-logements', logement_controller.delete_all_logements);

// Route pour récupérer les réservations d'un logement par son id
router.get('/reservation-logement/:id', logement_controller.get_reservations_of_logement);

// Route pour rechercher un logement avec des critères
router.post('/recherche-logement', logement_controller.search_logement)





// Exportation du router
module.exports = router;