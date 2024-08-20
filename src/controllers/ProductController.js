const Product = require('../models/Product');
const Category = require('../models/Category');
const ProductImage = require('../models/ProductImage');
const ProductOption = require('../models/ProductOption');

module.exports = {
  async getAllProducts(req, res) {
    try {
      const products = await Product.findAll({
        include: [Category, ProductImage, ProductOption],
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async getProductById(req, res) {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [Category, ProductImage, ProductOption],
      });
      if (!product) return res.status(404).json({ error: 'Product not found' });

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async createProduct(req, res) {
    try {
      const { enabled, name, slug, stock, description, price, price_with_discount, categories } = req.body;
      const product = await Product.create({
        enabled,
        name,
        slug,
        stock,
        description,
        price,
        price_with_discount,
      });

      if (categories && categories.length > 0) {
        const categoryInstances = await Category.findAll({
          where: { id: categories },
        });
        await product.setCategories(categoryInstances);
      }

      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async updateProduct(req, res) {
    try {
      const { enabled, name, slug, stock, description, price, price_with_discount, categories } = req.body;
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ error: 'Product not found' });

      product.enabled = enabled;
      product.name = name;
      product.slug = slug;
      product.stock = stock;
      product.description = description;
      product.price = price;
      product.price_with_discount = price_with_discount;

      await product.save();

      if (categories && categories.length > 0) {
        const categoryInstances = await Category.findAll({
          where: { id: categories },
        });
        await product.setCategories(categoryInstances);
      }

      res.json({ message: 'Product updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async deleteProduct(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ error: 'Product not found' });

      await product.destroy();
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
