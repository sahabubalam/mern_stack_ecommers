
const express = require('express');
const categoryRouter = express.Router();
const categoryController = require('../controllers/categoryController');

categoryRouter.post('/category', categoryController.createCategory);

module.exports = categoryRouter;