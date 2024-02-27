// controllers/reservation_controller.js

// Importation de jwt pour vérifier les cookies d el'utilisateur
const jwt = require('jsonwebtoken');
// Importation du model reservation
const Reservation = require('../models/reservation_model');
// Charger le module des variables d'environnement & exportation des variables d'environnements
require('dotenv').config();



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





// Router pour obtenir toutes les réservations
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