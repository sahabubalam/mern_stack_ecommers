
const User = require('../models/user');

const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const newUser = new User({ username, email });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
};

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while retrieving users.' });
    }
};
const getUserById = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while retrieving the user.' });
    }
  };
  const updateUserById = async (req, res) => {
    try {
      const userId = req.params.userId;
      const updatedUserData = req.body; // This should contain the fields to update
      const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
        new: true,
      });
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
  };

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById
};
