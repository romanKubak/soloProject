'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, ShopCart }) {
      this.belongsTo(User, { foreignKey: "user_id" })
      this.hasMany(ShopCart, { foreignKey: "product_id" })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    img: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stars_count: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
