const Category = require('../models/Category');

module.exports = {
  async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getCategoryById(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) return res.status(404).json({ error: 'Category not found' });

      res.json(category);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async createCategory(req, res) {
    try {
      const { name, slug, use_in_menu } = req.body;
      const category = await Category.create({ name, slug, use_in_menu });
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async updateCategory(req, res) {
    try {
      const { name, slug, use_in_menu } = req.body;
      const category = await Category.findByPk(req.params.id);
      if (!category) return res.status(404).json({ error: 'Category not found' });

      category.name = name;
      category.slug = slug;
      category.use_in_menu = use_in_menu;

      await category.save();
      res.json({ message: 'Category updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async deleteCategory(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) return res.status(404).json({ error: 'Category not found' });

      await category.destroy();
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
