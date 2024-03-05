const express = require('express');
const router = express.Router();
const type_controller = require('../controllers/type_controller');

// Route pour l'ajout d'un nouveau type
router.post('/ajouter-type', type_controller.ajouter_type);

module.exports = router;
