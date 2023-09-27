
const User = require('../models/User');

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
  // controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// Controller for user registration
const registerUser = async (req, res) => {
    console.log({S:req.body});
    try {
      const { username, password } = req.body;
  console.log({password:password});
  console.log({username:username});
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists.' });
      }
      if (!password || typeof password !== "string") {
        throw Error("Password is required");
    }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred during registration.' });
    }
  };
  const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find the user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }
  
      // Check the password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
        expiresIn: '1h', // Token expiration time (adjust as needed)
      });
  
      res.status(200).json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred during login.' });
    }
  };

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  registerUser,
  loginUser
};
