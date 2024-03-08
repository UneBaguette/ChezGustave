// Controller pour envoyer une demande de parrainage à un admin



const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const transporter = require('../config/nodeMailer');



exports.send_invitation_request = async (req, res) => {
    try {
      const { token } = req.cookies;
  
      if (!token) {
        console.log("Désolé, token invalide.");
      }
  
      const decoded_token = jwt.verify(token, process.env.SECRET_KEY);
  
      if (!decoded_token) {
        return res.status(401).json({ message: "Token invalide." });
      }
  
      const user_id = decoded_token.user._id;
  
      if (!user_id) {
        return res.status(401).json({ message: "Identifiant de l'utilisateur manquant." });
      }
  
      const user = await User.findById(user_id);
  
      const { name, email, tel } = req.body;
  
      // Envoi de l'e-mail à l'administrateur
      await transporter.sendMail({
        from: user.email, // l'adresse e-mail fournie par l'utilisateur comme expéditeur
        to: ' marvin.malouin@gmail.com', // l'e-mail de l'administrateur
        subject: 'Demande d\'invitation à rejoindre la plateforme',
        html: `
  <p>Cher(e) administrateur,</p>
  <p>${user.name} a demandé une invitation à rejoindre la plateforme. Voici ses informations :</p>
  <p>Nom: ${name}</p>
  <p>E-mail: ${email}</p>
  <p>Téléphone: ${tel}</p>
  <p>Veuillez générer un mail d'invitation depuis l'interface d'administration.</p>
  <p>Cordialement,</p>
  <p>L'équipe de la plateforme</p>`
      });
  
      res.status(200).json({ message: 'Demande d\'invitation envoyée à l\'administrateur avec succès' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };