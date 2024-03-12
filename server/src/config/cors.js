// config/cors.js



// Importation du module cors
const cors = require('cors');



const corsOptions = {
    origin: process.env.FRONT_URL,
    optionsSuccessStatus: 200 // Définir le code de statut pour les pré-vérifications OPTIONS réussies
};





module.exports = cors(corsOptions);