const mongoose = require('mongoose');



// Définition du schéma logement
const logement_schema = new mongoose.Schema({
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
  equipements: [String],
  adulte : { type: Number },
  enfant: { type: Number },
  animeaux: { type: Number },
});

// Création du modèle à partir du schéma
const Logement_model = mongoose.model('Logement', logement_schema);





module.exports = Logement_model;