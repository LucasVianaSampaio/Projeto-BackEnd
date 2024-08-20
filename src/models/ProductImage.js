const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');

const ProductImage = sequelize.define('ProductImage', {
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product,
      key: 'id'
    }
  },
  enabled: { type: DataTypes.BOOLEAN, defaultValue: false },
  path: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: true });

Product.hasMany(ProductImage, { foreignKey: 'product_id' });

module.exports = ProductImage;
