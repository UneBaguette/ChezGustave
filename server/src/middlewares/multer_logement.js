// middleware/multerVoyage.js

// Importation du module multer pour la gestion des fichiers uploadés
const multer = require("multer");
// Importation du module path pour manipuler les chemins de fichiers
const path = require("path");



// Configuration du stockage des fichiers uploadés avec multer
const storage = multer.diskStorage({
  // Fonction pour définir le répertoire de destination des fichiers uploadés
  destination: function (req, file, cb) {
    console.log("Destination:", "src/uploads/logements");
    // Callback avec le chemin du répertoire de destination
    cb(null, "src/uploads/logements");
  },
  // Fonction pour définir le nom du fichier uploadé
  filename: function (req, file, cb) {
    console.log("Originalname:", file.originalname);
    // Timestamp actuel pour garantir un nom de fichier unique
    const timestamp = Date.now();
    // Extension du fichier original
    const extension = path.extname(file.originalname);
    // Construction du nom de fichier avec timestamp et extension
    const filename = `${timestamp}${extension}`;
    console.log("Filename:", filename);
    // Callback avec le nom de fichier final
    cb(null, filename);
  },
});

// Configuration de multer avec les options de stockage définies
const upload_logements = multer({ storage: storage });

module.exports = upload_logements;
