
const User = require('../models/Category');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new User({ name });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
};


module.exports = {
  createCategory,
};
