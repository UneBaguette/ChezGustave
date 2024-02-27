// Importation du module express
const express = require('express');
// Création du router
const router = express.Router();
// Importation du controller pour ajouter un logement
const logement_controller = require('../controllers/logement_controller');



// Route pour ajouter un logement
router.post('/ajouter-logement', logement_controller.ajouter_logement);





// Exportation du router
module.exports = router;
