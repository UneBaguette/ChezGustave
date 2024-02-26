const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');

// Route pour créer un nouvel utilisateur
router.post('/ajout-user', user_controller.create_user);

module.exports = router;