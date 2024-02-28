// controllers/reservation_controller.js

// Importation de jwt pour vérifier les cookies d el'utilisateur
const jwt = require('jsonwebtoken');
// Importation du model reservation
const Reservation = require('../models/reservation_model');
// Charger le module des variables d'environnement & exportation des variables d'environnements
require('dotenv').config();



// Controller pour créeer une réseravation via l'user connecté du cookies
exports.create_reservation = async (req, res) => {
    try {
        // Récupérer le token depuis les cookies
        const { token } = req.cookies;

        // Vérifier si un token est présent dans les cookies
        if (!token) {
            return res.status(401).json({ message: 'Aucun token trouvé dans les cookies.' });
        }

        // Débogage: Afficher le token récupéré
        console.log('Token récupéré depuis les cookies :', token);

        // Décode le token pour obtenir les informations de l'utilisateur
        const decoded_token = jwt.verify(token, process.env.SECRET_KEY);

        // Vérifier si des informations utilisateur sont présentes dans le token décodé
        if (!decoded_token || !decoded_token.user) {
            return res.status(401).json({ message: 'Aucune information utilisateur trouvée dans le token décodé.' });
        }

        // Récupérer l'ID de l'utilisateur à partir du token décodé
        const user_id = decoded_token.user._id;

        // Récupérer les informations de la réservation depuis le corps de la requête
        const { start_date, end_date, chef_cuisine, visite, logement_id, user_id: req_user_id } = req.body;

        // Vérifier si l'ID de l'utilisateur dans le token correspond à celui dans le corps de la requête
        if (req_user_id && req_user_id !== user_id) {
            return res.status(401).json({ message: "L'ID de l'utilisateur dans le token ne correspond pas à celui dans la requête." });
        }

        // Créer une nouvelle réservation avec l'ID de l'utilisateur
        const new_reservation = new Reservation({
            start_date,
            end_date,
            chef_cuisine,
            visite,
            logement_id,
            user_id
        });

        // Sauvegarder la réservation dans la base de données
        const saved_reservation = await new_reservation.save();

        // Renvoyer la réponse avec la réservation créée
        res.status(201).json(saved_reservation);
    } catch (error) {
        console.error("Une erreur s'est produite lors de la création de la réservation :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la création de la réservation." });
    }
};





// Controller pour obtenir toutes les réservations
exports.get_all_reservations = async (req, res) => {
    try {
        // Récupérer toutes les réservations dans la base de données
        const reservations = await Reservation.find();

        // Renvoyer les réservations dans la réponse
        res.status(200).json(reservations);
    } catch (error) {
        // En cas d'erreur, renvoyer un code d'erreur avec un message
        console.error("Une erreur s'est produite lors de la récupération des réservations :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des réservations." });
    }
};





// Contrôleur pour récupérer les détails d'une réservation
exports.get_reservation_details = async (req, res) => {
    try {
        // Récupérer l'ID de la réservation depuis les paramètres de l'URL
        const reservation_id = req.params.id;

        // Recherche de la réservation dans la base de données par son ID
        const reservation = await Reservation.findById(reservation_id);

        // Vérifier si la réservation existe
        if (!reservation) {
            return res.status(404).json({ message: "Réservation non trouvée." });
        }
b
        // Renvoyer les détails de la réservation dans la réponse
        res.status(200).json(reservation);
    } catch (error) {
        // En cas d'erreur, renvoyer un code d'erreur avec un message
        console.error("Erreur lors de la récupération des détails de la réservation :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des détails de la réservation." });
    }
};





// Contrôleur pour mettre à jour les détails d'une réservation par son id
exports.update_reservation_details = async (req, res) => {
    try {
        // Récupérer l'ID de la réservation depuis les paramètres de l'URL
        const reservation_id = req.params.id;

        // Récupérer les nouvelles données de la réservation depuis le corps de la requête
        const updated_data = req.body;

        // Mettre à jour les détails de la réservation dans la base de données
        const updated_reservation = await Reservation.findByIdAndUpdate(reservation_id, updated_data, { new: true });

        // Vérifier si la réservation a été trouvée et mise à jour
        if (!updated_reservation) {
            return res.status(404).json({ message: "Réservation non trouvée." });
        }

        // Renvoyer la réservation mise à jour dans la réponse
        res.status(200).json(updated_reservation);
    } catch (error) {
        // En cas d'erreur, renvoyer un code d'erreur avec un message
        console.error("Erreur lors de la mise à jour des détails de la réservation :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour des détails de la réservation." });
    }
};





// Contorller pour metttre à jour toutes les reservations 
exports.update_all_reservations = async (req, res) => {
    try {
        // Mise à jour de toutes les réservations avec les données reçues du corps de la requête
        const updated_reservations = await Reservation.updateMany({}, req.body, { new: true });

        // Renvoi des réservations mises à jour dans la réponse
        res.status(200).json(updated_reservations);
    } catch (error) {
        // En cas d'erreur, renvoi d'un message d'erreur avec le code d'erreur 500 (Internal Server Error)
        console.error("Une erreur s'est produite lors de la mise à jour des réservations :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour des réservations." });
    }
};





// Controller pour Supprimer une réservation par son id
exports.delete_reservation = async (req, res) => {
    try {
        // Récupération de l'ID de la réservation depuis les paramètres de l'URL
        const reservation_id = req.params.id;

        // Recherche de la réservation dans la base de données par son ID et suppression
        const deleted_reservation = await Reservation.findByIdAndDelete(reservation_id);

        // Vérification si la réservation a été trouvée et supprimée
        if (!deleted_reservation) {
            return res.status(404).json({ message: "Réservation non trouvée." });
        }

        // Renvoi d'une réponse de succès
        res.status(200).json({ message: "Réservation supprimée avec succès." });
    } catch (error) {
        // En cas d'erreur, renvoi d'un message d'erreur avec le code d'erreur 500 (Internal Server Error)
        console.error("Une erreur s'est produite lors de la suppression de la réservation :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de la réservation." });
    }
};





// Controller pour Supprimer toutes les réservations
exports.delete_all_reservations = async (req, res) => {
    try {
        // Suppression de toutes les réservations dans la base de données
        await Reservation.deleteMany();

        // Renvoi d'une réponse de succès
        res.status(200).json({ message: "Toutes les réservations ont été supprimées avec succès." });
    } catch (error) {
        // En cas d'erreur, renvoi d'un message d'erreur avec le code d'erreur 500 (Internal Server Error)
        console.error("Une erreur s'est produite lors de la suppression de toutes les réservations :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de toutes les réservations." });
    }
};





// Contrtoller pour Récupérer les notes d'une réservation par son id
exports.get_reservation_rating = async (req, res) => {
    try {
        // Récupération de l'ID de la réservation depuis les paramètres de l'URL
        const reservation_id = req.params.id;

        // Recherche de la réservation dans la base de données par son ID
        const reservation = await Reservation.findById(reservation_id);

        // Vérification si la réservation existe
        if (!reservation) {
            return res.status(404).json({ message: "Réservation non trouvée." });
        }

        // Vérification si la réservation a une note
        if (!reservation.rating) {
            return res.status(404).json({ message: "Cette réservation n'a pas encore de note." });
        }

        // Renvoi de la note de la réservation dans la réponse
        res.status(200).json({ rating: reservation.rating });
    } catch (error) {
        // En cas d'erreur, renvoi d'un message d'erreur avec le code d'erreur 500 (Internal Server Error)
        console.error("Une erreur s'est produite lors de la récupération de la note de la réservation :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération de la note de la réservation." });
    }
};