const Logement = require('../models/logement_model');



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