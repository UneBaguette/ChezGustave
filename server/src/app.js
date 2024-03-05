// app.js



// Importation du framework express 
const express = require('express');
// Importation de la bibliothèque JWT
const jwt = require('jsonwebtoken');
// Charger le module des variables d'environnement & exportation des variables d'environnements
require('dotenv').config();
// Importation des middlewares de l'application
const { session_middleware, cookie_parser_middleware, body_parser_middleware } = require('./middlewares/app_middlewares');





// Création d'une nouvelle instance de l'application Express
const app = express();





// Utilisation des middlewares
app.use(body_parser_middleware);
app.use(cookie_parser_middleware);
app.use(session_middleware);





// Utilisation des routes de l'application :

// Utilisation des routes pour les utilisateurs
const user_route = require('./routes/user_route');
app.use('/user', user_route);

// Utilisation des routes pour les reservations
const reservation_route = require('./routes/reservation_routes');
app.use('/reservation', reservation_route);

// Utilisation des routes pour rating
const rating_route = require('./routes/rating_routes');
app.use('/rating', rating_route);

// Utilisation des routes pour logement
const logement_route = require('./routes/logement_routes');
app.use('/logement', logement_route);

//
const equipement_route = require('./routes/equipement_routes');
app.use('/equipement', equipement_route)

const type_route = require('./routes/type_routes');
app.use('/type', type_route);





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

// Configuration du port d'écoute 
app.listen( PORT, () => {
    console.log('Serveur en écoute sur le port : ', PORT);
});





// Exportation de l'application
module.exports = app;