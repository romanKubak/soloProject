'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShopCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Product}) {
      this.belongsTo(User, { foreignKey: "user_id" })
      this.belongsTo(Product, { foreignKey: "product_id" })
    }
  }
  ShopCart.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    status_pay: DataTypes.BOOLEAN,
    status_done: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'ShopCart',
  });
  return ShopCart;
};
