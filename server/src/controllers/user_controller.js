const User = require('../models/user_model');
const jwt = require('jsonwebtoken');


// Contorller d'ajout d'un utilisateur
const bcrypt = require('bcrypt');





// Controller pour l'inscritpion d'un utilisateur
exports.create_user = async (req, res) => {
    try {
        // Récupération des informations de l'utilisateur via la requête
        const { email, name, tel, password, is_admin } = req.body;

        // Hash du mot de passe
        const hashed_password = await bcrypt.hash(password, 10);

        // Création d'un nouvel utilisateur avec le mot de passe hashé
        const newUser = new User({
            email,
            name,
            tel,
            password: hashed_password, // Utilisation du mot de passe hashé
            is_admin
        });

        // Sauvegarde de l'utilisateur
        const saved_user = await newUser.save();

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
        const usersToUpdate = req.body;

        // Parcourir chaque utilisateur à mettre à jour
        for (let i = 0; i < usersToUpdate.length; i++) {
            const userData = usersToUpdate[i];
            const userId = userData._id;

            // Mettre à jour l'utilisateur dans la base de données
            await User.findByIdAndUpdate(userId, userData, { new: true });
        }

        // Renvoyer une réponse de succès si toutes les mises à jour ont réussi
        res.status(200).json({ message: "Mise à jour des utilisateurs réussie." });
    } catch (error) {
        // En cas d'erreur, renvoyer un code d'erreur avec un message
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour des utilisateurs." });
    }
};





// Controller pour Mettre à jour des users via son id 
exports.update_user_by_id = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur à mettre à jour depuis les paramètres de l'URL
        const userId = req.params.id;
        // Récupérer les données de l'utilisateur à mettre à jour depuis le corps de la requête
        const userData = req.body;

        // Mettre à jour l'utilisateur dans la base de données
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });

        // Vérifier si l'utilisateur a été trouvé et mis à jour
        if (!updatedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Renvoyer la réponse avec l'utilisateur mis à jour
        res.status(200).json(updatedUser);
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
exports.delete_user_by_id = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur à supprimer depuis les paramètres de l'URL
        const userId = req.params.id;

        // Supprimer l'utilisateur de la base de données
        const deletedUser = await User.findByIdAndDelete(userId);

        // Vérifier si l'utilisateur a été trouvé et supprimé
        if (!deletedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Renvoyer une réponse réussie
        res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression de l'utilisateur :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'utilisateur." });
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

        // Générez le token JWT
        const token = jwt.sign({ user_id: user._id }, process.env.SECRET_KEY);

        // Renvoyer le token dans la réponse
        // Renvoyer le token et les informations de l'utilisateur dans la réponse
        res.status(200).json({
            message: 'Authentification réussie',token,user});
    } catch (error) {
        console.error(`Erreur lors de l'authentification :`, error);
        res.status(500).json({ message: `Erreur lors de l'authentification` });
    }
};