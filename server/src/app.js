// app.js



// Importation du framework express 
const express = require('express');
const jwt = require('jsonwebtoken');
// Charger le module des variables d'environnement & exportation des variables d'environnements
require('dotenv').config;
// Importation des middlewares de l'application
// à faire après
// const { session_middleware, cookie_parser_middleware, body_parser_middleware } = require('./middlewares/app_middlewares');





// Création d'une nouvelle instance de l'application Express
const app = express();




// à faire après
// Utilisation des middlewares
// app.use(body_parser_middleware);
// app.use(cookie_parser_middleware);
// app.use(session_middleware);




// Utilisation des routes de l'application







// Décoder le token dans le cookie à l'aide de JWT
app.use( (req,res,next) => {
    const token = req.cookies.token;
        if(token) {
            try {
                const decoded = jwt.verify(token, process.env.SECRET_KEY);
                req.user = decoded;
                next();
            } catch (error) {
                logger.error('Erreur de vérification JWT token :', error);
                res.clearCookie('token');
            }
        }
        next();
});








// Mise en écoute du server

const PORT = process.env.SERVER_PORT || 3000;

// Configuration du port d'écoute du serverconsole.log('Port d\'écoute du serveur : ', process.env.PORT_BACK_ECOUTE);
app.listen( PORT, () => {
    console.log('Serveur en écoute sur le port : ', PORT);
});





// Exportation de l'application
module.exports = app;