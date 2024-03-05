const Type = require('../models/type_model');

exports.ajouter_type = async (req, res) => {
    try {
        const { tag } = req.body;

        // Créer un nouveau type
        const nouveau_type = new Type({ tag });

        // Sauvegarder le nouveau type dans la base de données
        const type_enregistre = await nouveau_type.save();

        // Répondre avec le type enregistré
        res.status(201).json(type_enregistre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
