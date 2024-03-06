'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category_file extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category_file.hasMany(models.File, { foreignKey: 'id_category' })
    }
  }
  Category_file.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category_file',
  });
  return Category_file;
};