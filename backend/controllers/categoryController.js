const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body.name);
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.getAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
