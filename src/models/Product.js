const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  enabled: { type: DataTypes.BOOLEAN, defaultValue: false },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false },
  stock: { type: DataTypes.INTEGER, defaultValue: 0 },
  description: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT, allowNull: false },
  price_with_discount: { type: DataTypes.FLOAT, allowNull: false },
}, { timestamps: true });

module.exports = Product;
