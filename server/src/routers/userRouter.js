
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUserById);
router.put('/users/:userId', userController.updateUserById);

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;