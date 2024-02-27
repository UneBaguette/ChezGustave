const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');



// Endpoint pour créer un nouvel utilisateur
router.post('/ajout-user', user_controller.create_user);

// Endpoint pour récupérer tous les utilisateurs
router.get('/get-all-users', user_controller.get_all_users);

// Endpoint rechercher les informations d'un utilisateur via son id
router.get('/get-user-by-id/:id', user_controller.get_user_by_id)

// Endpoint pour mettre à jour des utilisateurs en bloc
router.put('/update-users-bloc', user_controller.update_users_bloc);

// Endpoint pour mettre à jour un utilisateur par son ID
router.put('/update-users/:id', user_controller.update_user_by_id);

// Endpoint pour supprimer tout les utilisateurs
router.delete('/delete-all-users', user_controller.delete_all_users);

// Endpoint pour supprimer un utilisateur par son ID
router.delete('/delete-user/:id', user_controller.delete_user_by_id);

// Endpoint pour créer un nouvel utilisateur
router.get('/login-user', user_controller.login_user )

// Route pour la déconnexion de l'utilisateur
router.get('/logout-user', user_controller.logout_user);

// Endpoint pour obtenir les informations d'un utilisateurs connecté
router.get('/get-logged-in-user', user_controller.get_logged_in_user)






module.exports = router;