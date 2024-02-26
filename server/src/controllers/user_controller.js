const User = require('../models/user_model');

exports.create_user = async (req, res) => {
  try {
    const new_user = new User(req.body);
    const saved_user = await new_user.save();
    res.status(201).json(saved_user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};