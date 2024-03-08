const nodemailer = require('nodemailer');



// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'marvinmorin@gmail.com',
    pass: 'gjfo fzrt uyry nlvy'
  }
});





module.exports = transporter;