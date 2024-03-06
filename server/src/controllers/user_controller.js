// Importation du model user
const User = require('../models/user_model');
// Controller pour récupérer les réservations d'un user
const Reservation = require('../models/reservation_model');
// Importation de jwt pour vérifier les cookies d el'utilisateur
const jwt = require('jsonwebtoken');
// Contorller d'ajout d'un utilisateur
const bcrypt = require('bcrypt');
// Charger le module des variables d'environnement & exportation des variables d'environnements
require('dotenv').config();



// Controller pour l'inscritpion d'un utilisateur
exports.create_user = async (req, res) => {
    try {
        // Récupération des informations de l'utilisateur via la requête
        const { email, name, tel, password, is_admin } = req.body;

        // Hash du mot de passe
        const hashed_password = await bcrypt.hash(password, 10);

        // Création d'un nouvel utilisateur avec le mot de passe hashé
        const new_user = new User({
            email,
            name,
            tel,
            password: hashed_password, // Utilisation du mot de passe hashé
            is_admin
        });

        // Sauvegarde de l'utilisateur
        const saved_user = await new_user.save();

        // Réponse positive de l'utilisateur sauvegardé
        res.status(201).json(saved_user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};





// Controller pour obtenir tous les utilisateurs
exports.get_all_users = async (req, res) => {
    try {
        // Récupérer tous les utilisateurs depuis la base de données
        const users = await User.find();
        // Renvoyer la liste des utilisateurs dans la réponse
        res.status(200).json(users);
    } catch (error) {
        // En cas d'erreur, renvoyer un code d'erreur avec un message
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des utilisateurs." });
    }
};





// Controller de recherche d'informations d'un utilisateur via son id
exports.get_user_by_id = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
        const user_id = req.params.id;

        // Rechercher l'utilisateur dans la base de données par son ID
        const user = await User.findById(user_id);

        // Vérifier si l'utilisateur existe
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Si l'utilisateur existe, le renvoyer dans la réponse
        res.status(200).json(user);
    } catch (error) {
        console.error(`Erreur lors de la récupération de l'utilisateur :`, error);
        res.status(500).json({ message: `Erreur lors de la récupération de l'utilisateur` });
    }
};





// Mettre à jour des utilisateurs en bloc
exports.update_users_bloc = async (req, res) => {
    try {
        // Récupérer les données des utilisateurs à mettre à jour depuis la requête
        const users_to_update = req.body;

        // Parcourir chaque utilisateur à mettre à jour
        for (let i = 0; i < users_to_update.length; i++) {
            const user_data = users_to_update[i];
            const user_id = user_data._id;

            // Vérifier si un nouveau mot de passe est fourni
            if (user_data.password) {
                // Hasher le nouveau mot de passe
                user_data.password = await bcrypt.hash(user_data.password, 10);
            }

            // Mettre à jour l'utilisateur dans la base de données
            await User.findByIdAndUpdate(user_id, user_data, { new: true });
        }

        // Renvoyer une réponse de succès si toutes les mises à jour ont réussi
        res.status(200).json({ message: "Mise à jour des utilisateurs réussie." });
    } catch (error) {
        // En cas d'erreur, renvoyer un code d'erreur avec un message
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour des utilisateurs." });
    }
};





// Controller pour Mettre à jour un utilisateur via son id 
exports.update_user = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur à mettre à jour depuis les paramètres de l'URL
        const user_id = req.params.id;
        // Récupérer les données de l'utilisateur à mettre à jour depuis le corps de la requête
        let user_data = req.body;

        // Vérifier si un nouveau mot de passe est fourni
        if (user_data.password) {
            // Hasher le nouveau mot de passe
            user_data.password = await bcrypt.hash(user_data.password, 10);
        }

        // Mettre à jour l'utilisateur dans la base de données
        const updated_user = await User.findByIdAndUpdate(user_id, user_data, { new: true });

        // Vérifier si l'utilisateur a été trouvé et mis à jour
        if (!updated_user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Renvoyer la réponse avec l'utilisateur mis à jour
        res.status(200).json(updated_user);
    } catch (error) {
        console.error("Une erreur s'est produite lors de la mise à jour des utilisateurs :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour des utilisateurs." });
    }
};





// Controller pour supprimer tout les utilisateurs
exports.delete_all_users = async (req, res) => {
    try {
        // Supprimer tous les utilisateurs de la base de données
        await User.deleteMany();

        // Renvoyer une réponse réussie
        res.status(200).json({ message: "Tous les utilisateurs ont été supprimés avec succès." });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression de tous les utilisateurs :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de tous les utilisateurs." });
    }
};





// Controller pour supprimer un utilisateur via son id
exports.delete_user = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur à supprimer depuis les paramètres de l'URL
        const user_id = req.params.id;

        // Supprimer l'utilisateur de la base de données
        const deleted_user = await User.findByIdAndDelete(user_id);

        // Vérifier si l'utilisateur a été trouvé et supprimé
        if (!deleted_user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Renvoyer une réponse réussie
        res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression de l'utilisateur :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'utilisateur." });
    }
};





// Contorller pour récupérer les réservations d'un utilisateur par son id
exports.get_user_reservations = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur depuis les paramètres de l'URL
        const user_id = req.params.id;

        // Rechercher les réservations de l'utilisateur dans la base de données
        const user_reservations = await Reservation.find({ user_id: user_id });

        // Renvoyer les réservations de l'utilisateur dans la réponse
        res.status(200).json(user_reservations);
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des réservations de l'utilisateur :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des réservations de l'utilisateur." });
    }
};





// Controller d'authentification de l'ustilisateur
exports.login_user = async (req, res) => {
    try {
        // Vérifiez si l'utilisateur existe dans la base de données
        const user = await User.findOne({ email: req.body.email });
        
        if (!user) {
            return res.status(404).json({ message: 'Adresse e-mail incorrecte' });
        }

        // Vérifiez si le mot de passe est correct
        const password_match = await bcrypt.compare(req.body.password, user.password);
        if (!password_match) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Générez le token JWT en incluant les informations de l'utilisateur
        const token = jwt.sign({ user: user }, process.env.SECRET_KEY);

        // Définir le cookie dans la réponse avec le token
        res.cookie('token', token, { httpOnly: true });

        // Renvoyer le token et les informations de l'utilisateur dans la réponse
        res.status(200).json({
            message: 'Authentification réussie',
            token: token,
            user: user
        });

    } catch (error) {
        console.error(`Erreur lors de l'authentification :`, error);
        res.status(500).json({ message: `Erreur lors de l'authentification` });
    }
};






// Contrôleur pour la déconnexion de l'utilisateur
exports.logout_user = async (req, res) => {
    try {
        // Récupérer le token JWT à partir des cookies
        const { token } = req.cookies;

        // Vérification si le token existe
        if (!token || typeof token !== "string") {
            return res.status(401).json({
                message: `Aucun token trouvé. L'utilisateur n'est probablement pas connecté.`,
            });
        }

        // Supprimer le cookie en le remplaçant par un cookie vide et en définissant sa durée de vie à 0
        res.clearCookie('token');

        // Répondre avec un message de déconnexion réussie
        res.status(200).json({ message: 'Déconnexion réussie.' });
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}





// Contrôleur pour obtenir les informations de l'utilisateur connecté
exports.get_logged_in_user = async (req, res) => {
    try {
        // Récupération du token depuis les cookies
        const { token } = req.cookies;

        // Vérifier si un token est présent dans les cookies
        if (!token) {
            return res.status(401).json({ message: 'Aucun token trouvé dans les cookies.' });
        }

        // Décoder le token
        const decoded_token = jwt.verify(token, process.env.SECRET_KEY);

        // Vérifier si des informations utilisateur sont présentes dans le token décodé
        if (!decoded_token) {
            return res.status(401).json({ message: 'Aucune information utilisateur trouvée dans le token décodé.' });
        }
        
        // Répondre avec les informations de l'utilisateur stockées dans le token
        res.status(200).json({ message: 'Informations utilisateur récupérées avec succès.', user: decoded_token.user });
    } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}





// Controller pour récupérer les réservations d'un utilisateur spécifique par son id
exports.get_user_reservations = async (req, res) => {
    try {
        // Récupération de l'ID de l'utilisateur depuis les paramètres de l'URL
        const user_id = req.params.id;

        // Recherche des réservations de l'utilisateur dans la base de données
        const user_reservations = await Reservation.find({ user_id: user_id });

        // Renvoi des réservations dans la réponse
        res.status(200).json(user_reservations);
    } catch (error) {
        // En cas d'erreur, renvoi d'un code d'erreur avec un message
        console.error("Erreur lors de la récupération des réservations de l'utilisateur :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des réservations de l'utilisateur." });
    }
};