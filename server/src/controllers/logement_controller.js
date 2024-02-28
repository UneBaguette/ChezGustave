// Importation du model de logement
const Logement = require('../models/logement_model');
// Importation du model reservation
const Reservation = require('../models/reservation_model');



// Controller pour ajouter un logement 
exports.ajouter_logement = async (req, res) => {
    try {
        // Récupération des informations du logement depuis le corps de la requête
        const {
            images,
            secteur,
            description,
            tarif_bas,
            tarif_moyen,
            tarif_haut,
            m_carre,
            chambre,
            salle_de_bain,
            categorie,
            type,
            equipements
        } = req.body;

        // Création d'une nouvelle instance de Logement avec les données reçues
        const new_logement = new Logement({
            images,
            secteur,
            description,
            tarif_bas,
            tarif_moyen,
            tarif_haut,
            m_carre,
            chambre,
            salle_de_bain,
            categorie,
            type,
            equipements
        });

        // Sauvegarde du nouveau logement dans la base de données
        const saved_logement = await new_logement.save();

        // Réponse avec le logement ajouté
        res.status(201).json(saved_logement);
    } catch (error) {
        // En cas d'erreur, renvoyer un message d'erreur avec le code d'erreur 400 (Bad Request)
        res.status(400).json({ message: error.message });
    }
};




 
// Controller pour obtenir tous les details d'un logement par son id 
exports.get_logement_details = async (req, res) => {
    try {
        // Récupération de l'ID du logement depuis les paramètres de l'URL
        const logement_id = req.params.id;

        // Recherche du logement dans la base de données par son ID
        const logement = await Logement.findById(logement_id);

        // Vérification si le logement existe
        if (!logement) {
            return res.status(404).json({ message: 'Logement non trouvé' });
        }

        // Renvoi des détails du logement dans la réponse
        res.status(200).json(logement);
    } catch (error) {
        // En cas d'erreur, renvoi d'un message d'erreur avec le code d'erreur 500 (Internal Server Error)
        console.error("Une erreur s'est produite lors de la récupération des détails du logement :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des détails du logement." });
    }
};





// Controller pour modifier un logmeent par son id
exports.update_logement_details = async (req, res) => {
    try {
        // Récupération de l'ID du logement depuis les paramètres de l'URL
        const logement_id = req.params.id;

        // Recherche du logement dans la base de données par son ID
        let logement = await Logement.findById(logement_id);

        // Vérification si le logement existe
        if (!logement) {
            return res.status(404).json({ message: 'Logement non trouvé' });
        }

        // Mise à jour des détails du logement avec les données reçues du corps de la requête
        logement = await Logement.findByIdAndUpdate(logement_id, req.body, { new: true });

        // Renvoi du logement mis à jour dans la réponse
        res.status(200).json(logement);
    } catch (error) {
        // En cas d'erreur, renvoi d'un message d'erreur avec le code d'erreur 500 (Internal Server Error)
        console.error("Une erreur s'est produite lors de la mise à jour des détails du logement :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour des détails du logement." });
    }
};





// Contorller pour modifier les logemens
exports.update_all_logements = async (req, res) => {
    try {
        // Mise à jour de tous les logements avec les données reçues du corps de la requête
        const updated_logements = await Logement.updateMany({}, req.body, { new: true });

        // Renvoi des logements mis à jour dans la réponse
        res.status(200).json(updated_logements);
    } catch (error) {
        // En cas d'erreur, renvoi d'un message d'erreur avec le code d'erreur 500 (Internal Server Error)
        console.error("Une erreur s'est produite lors de la mise à jour des détails de tous les logements :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la mise à jour des détails de tous les logements." });
    }
};





// Controller pour supprimer un logement par son id
exports.delete_logement = async (req, res) => {
    try {
        // Récupérer l'ID du logement à supprimer depuis les paramètres de l'URL
        const logement_id = req.params.id;

        // Recherche du logement dans la base de données et suppression
        const logement_supprime = await Logement.findByIdAndDelete(logement_id);

        // Vérifier si le logement a été trouvé et supprimé
        if (!logement_supprime) {
            return res.status(404).json({ message: "Logement non trouvé." });
        }

        // Renvoyer une réponse de succès
        res.status(200).json({ message: "Logement supprimé avec succès." });
    } catch (error) {
        // En cas d'erreur, renvoyer un code d'erreur avec un message
        console.error("Erreur lors de la suppression du logement :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression du logement." });
    }
};





// Controller pour supprimer tout les logmements
exports.delete_all_logements = async (req, res) => {
    try {
        // Suppression de tous les logements dans la base de données
        await Logement.deleteMany();

        // Renvoi d'une réponse de succès
        res.status(200).json({ message: "Tous les logements ont été supprimés avec succès." });
    } catch (error) {
        // En cas d'erreur, renvoi d'un message d'erreur avec le code d'erreur 500 (Internal Server Error)
        console.error("Une erreur s'est produite lors de la suppression de tous les logements :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de tous les logements." });
    }
};





// Contrôleur pour récupérer les réservations d'un logement par son id
exports.get_reservations_of_logement = async (req, res) => {
    try {
        // Récupérer l'ID du logement depuis les paramètres de l'URL
        const logement_id = req.params.id;

        // Recherche des réservations associées au logement dans la base de données
        const reservations = await Reservation.find({ logement_id: logement_id });

        // Vérifier si des réservations ont été trouvées pour le logement
        if (!reservations || reservations.length === 0) {
            return res.status(404).json({ message: "Aucune réservation trouvée pour ce logement." });
        }

        // Renvoyer les réservations dans la réponse
        res.status(200).json(reservations);
    } catch (error) {
        // En cas d'erreur, renvoyer un code d'erreur avec un message
        console.error("Erreur lors de la récupération des réservations du logement :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des réservations du logement." });
    }
};





// Controller pour obtenir tous les logements
exports.get_all_logements = async (req, res) => {
    try {
        // Récupération de tous les logements depuis la base de données
        const logements = await Logement.find();

        // Renvoi des logements dans la réponse
        res.status(200).json(logements);
    } catch (error) {
        // En cas d'erreur, renvoi d'un message d'erreur avec le code d'erreur 500 (Internal Server Error)
        console.error("Une erreur s'est produite lors de la récupération des logements :", error);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des logements." });
    }
};