const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller');
const delete_user = require('../middlewares/delete_user_middleware');



// Route pour créer un nouvel utilisateur
router.post('/ajout-user', user_controller.create_user);

// Route pour récupérer tous les utilisateurs
router.get('/get-all-users', user_controller.get_all_users);

// Route rechercher les informations d'un utilisateur via son id
router.get('/get-user-by-id/:id', user_controller.get_user_by_id)

// Route pour mettre à jour des utilisateurs en bloc
router.put('/update-users-bloc', user_controller.update_users_bloc);

// Route pour mettre à jour un utilisateur par son ID
router.put('/update-users/:id', user_controller.update_user);

// Route pour supprimer tout les utilisateurs
router.delete('/delete-all-users', delete_user, user_controller.delete_all_users);

// Route pour supprimer un utilisateur par son ID
router.delete('/delete-user/:id', delete_user, user_controller.delete_user);

// Route pour créer un nouvel utilisateur
router.get('/login-user', user_controller.login_user )

// Route pour la déconnexion de l'utilisateur
router.get('/logout-user', user_controller.logout_user);

// Route pour obtenir les informations d'un utilisateurs connecté
router.get('/get-logged-in-user', user_controller.get_logged_in_user)

// Route pour récupérer les réservations d'un utilisateur
router.get('/:id/reservation', user_controller.get_user_reservations);





module.exports = router;