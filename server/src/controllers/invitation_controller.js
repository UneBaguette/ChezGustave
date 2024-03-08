const Invitation = require('../models/invitation_model');
const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const transporter = require('../config/nodeMailer');
const generate_randomPassword = require('../config/random_password');
// Contorller d'ajout d'un utilisateur
const bcrypt = require('bcrypt');



// Controller pour envoyer une invitation
exports.create_invitation = async (req, res) => {
  try {

    const { token } = req.cookies;

    if (!token) {
      console.log("Désolé, token invalide.");
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    if (!decodedToken) {
      return res.status(401).json({ message: "Token invalide." });
    }

    const user_id = decodedToken.user._id;

    if (!user_id) {
      return res.status(401).json({ message: "Identifiant de l'utilisateur manquant." });
    }

    const user = await User.findById(user_id)

    const { email, message } = req.body;

    // Générer un mot de passe aléatoire de longueur 10
    const password = generate_randomPassword(10);

    // Hasher le mot de passe
    const hashed_password = await bcrypt.hash(password, 10);

    const new_invitation = new Invitation({
      sponsor: user,
      email,
      message
    });

    await new_invitation.save();

    // Envoi de l'e-mail d'invitation avec le mot de passe provisoire non hashé
    await transporter.sendMail({
      from: 'marvinmorin@gmail.com',
      to: email,
      subject: 'Invitation à rejoindre notre plateforme',
      html: `
<p>Cher(e) utilisateur,</p>
<p>Vous avez été invité(e) à rejoindre notre plateforme. Voici vos informations de connexion :</p>
<p>E-mail: ${email}</p>
<p>Mot de passe provisoire: ${password}</p>
<p>${message}</p>
<p>Bienvenue !</p>`
    });

    // Enregistrer l'e-mail de l'utilisateur invité avec le mot de passe hashé
    const invited_user = new User({
      email,
      name: '',
      tel: '',
      password: hashed_password, // Utilisation du mot de passe hashé
      is_admin: false
    });

    await invited_user.save();

    res.status(201).json({ message: 'Invitation created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





exports.get_invitations = async (req, res) => {
  try {
    const invitations = await Invitation.find({ sponsor: req.user._id }); // Get invitations for the logged-in user
    res.status(200).json(invitations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};





// Controller pour Supprimer toutes les invitations
exports.delete_all_invitations = async (req, res) => {
  try {
    // Supprimer toutes les invitations
    await Invitation.deleteMany({});
    res.status(200).json({ message: 'Toutes les invitations ont été supprimées avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression des invitations' });
  }
};
