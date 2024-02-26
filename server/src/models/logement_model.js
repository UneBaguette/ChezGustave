const mongoose = require('mongoose');

// Définition du schéma
const logement_schema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  images: [String],
  secteur: { type: String, required: true },
  description: { type: String, required: true },
  tarif_bas: { type: Number, required: true },
  tarif_moyen: { type: Number, required: true },
  tarif_haut: { type: Number, required: true },
  m_carre: { type: Number, required: true },
  chambre: { type: Number, required: true },
  salle_de_bain: { type: Number, required: true },
  categorie: { type: String, required: true },
  type: { type: String, required: true },
  equipements: [String]
});

// Création du modèle à partir du schéma
const Logement_model = mongoose.model('Logement_model', logement_schema);

module.exports = Logement_model;