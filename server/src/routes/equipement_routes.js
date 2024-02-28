// Importation du module express
const express = require('express');
// Création du router
const router = express.Router();
// Importation du controller pour créer un équipement
const equipment_controller = require('../controllers/equipement_controller');



// Route pour créer un équipement
router.post('/create-equipment', equipment_controller.create_equipment);

// Route pour récupérer tous les équipements
router.get('/get-all-equipments', equipment_controller.get_all_equipments);

// Route pour mettre à jour un équipement par son ID
router.put('/update-equipment/:id', equipment_controller.update_equipment);

// Route pour mettre à jour tous les équipements
router.put('/update-all-equipments', equipment_controller.update_all_equipments);

// Route pour supprimer un équipement par son ID
router.delete('/delete-equipment/:id', equipment_controller.delete_equipment);

// Route pour supprimer tous les équipements
router.delete('/delete-all-equipments', equipment_controller.delete_all_equipments);

// Route pour récupérer les détails d'un équipement par son ID
router.get('/get-equipment-details/:id', equipment_controller.get_equipment_details);





// Exportation du router
module.exports = router;
