const Rating = require('../models/rating_model');
// Importer le contrôleur pour créer une note
const Reservation = require('../models/reservation_model');
const Logement = require('../models/logement_model');
const User = require('../models/user_model');



// Controller pour créer une note
exports.create_rating = async (req, res) => {
    try {
        // Récupérer les données de la note depuis le corps de la requête
        const { rated, text, logement_id, reservation_id, user_id } = req.body;

        // Vérifier si les ID existent pour le logement, la réservation et l'utilisateur
        const logement_exists = await Logement.exists({ _id: logement_id });
        const reservation_exists = await Reservation.exists({ _id: reservation_id });
        const user_exists = await User.exists({ _id: user_id });

        // Vérifier si le logement, la réservation et l'utilisateur existent avant de créer la note
        if (!logement_exists || !reservation_exists || !user_exists) {
            return res.status(404).json({ message: "Logement, réservation ou utilisateur non trouvé." });
        }

        // Créer une nouvelle note
        const new_rating = new Rating({
            rated,
            text,
            logement_id,
            reservation_id,
            user_id
        });

        // Sauvegarder la nouvelle note
        await new_rating.save();

        // Renvoyer une réponse de succès
        res.status(201).json({ message: "Note créée avec succès." });
    } catch (error) {
        // En cas d'erreur, renvoyer un message d'erreur avec le code d'erreur 500 (Internal Server Error)
        console.error("Une erreur s'est produite lors de la création de la note :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la création de la note." });
    }
};





// Contrôleur pour récupérer toutes les notes
exports.get_all_ratings = async (req, res) => {
    try {
        // Récupérer toutes les notes de la base de données
        const all_ratings = await Rating.find();

        // Renvoyer les notes récupérées
        res.status(200).json(all_ratings);
    } catch (error) {
        // En cas d'erreur, renvoyer un message d'erreur avec le code d'erreur 500 (Internal Server Error)
        console.error("Une erreur s'est produite lors de la récupération des notes :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des notes." });
    }
};





// Controller pour mettre à jour une note
exports.update_rating = async (req, res) => {
    try {
        const { rated, text } = req.body;
        const rating_id = req.params.id;

        // Vérifier si la note existe
        const rating_exists = await Rating.exists({ _id: rating_id });
        if (!rating_exists) {
            return res.status(404).json({ message: "Note non trouvée." });
        }

        // Mettre à jour la note
        await Rating.findByIdAndUpdate(rating_id, { rated, text });

        // Renvoyer une réponse de succès
        res.status(200).json({ message: "Note mise à jour avec succès." });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la mise à jour de la note :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour de la note." });
    }
};





// Controller pour mettre à jour toutes les notes
exports.update_all_ratings = async (req, res) => {
    try {
        const { rated, text } = req.body;

        // Mettre à jour toutes les notes
        await Rating.updateMany({}, { rated, text });

        // Renvoyer une réponse de succès
        res.status(200).json({ message: "Toutes les notes ont été mises à jour avec succès." });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la mise à jour de toutes les notes :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour de toutes les notes." });
    }
};





// Controller pour supprimer une note par son ID
exports.delete_rating = async (req, res) => {
    try {
        // Récupérer l'ID de la note depuis les paramètres de la requête
        const rating_id = req.params.id;

        // Supprimer la note de la base de données par son ID
        const deleted_rating = await Rating.findByIdAndDelete(rating_id);

        // Vérifier si la note a été trouvée et supprimée
        if (!deleted_rating) {
            return res.status(404).json({ message: "Note non trouvée ou déjà supprimée." });
        }

        // Renvoyer un message de succès après la suppression
        res.status(200).json({ message: "Note supprimée avec succès." });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression de la note :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de la note." });
    }
};





// Controller pour supprimer toutes les notes
exports.delete_all_ratings = async (req, res) => {
    try {
        // Supprimer toutes les notes
        await Rating.deleteMany({});

        // Renvoyer une réponse de succès
        res.status(200).json({ message: "Toutes les notes ont été supprimées avec succès." });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la suppression de toutes les notes :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de toutes les notes." });
    }
};





// Controller pour récupérer les détails d'une note par son ID
exports.get_rating_details = async (req, res) => {
    try {
        // Récupérer l'ID de la note depuis les paramètres de la requête
        const rating_id = req.params.id;

        // Trouver la note dans la base de données par son ID
        const rating = await Rating.findById(rating_id);

        // Vérifier si la note existe
        if (!rating) {
            return res.status(404).json({ message: "Note non trouvée." });
        }

        // Renvoyer les détails de la note
        res.status(200).json({ rating });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des détails de la note :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des détails de la note." });
    }
};