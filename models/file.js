'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      File.belongsTo(models.User, { foreignKey: 'id_user' })
      File.belongsTo(models.Category_file, { foreignKey: 'id_category' })
    }
  }
  File.init({
    file: DataTypes.STRING,
    file_name: DataTypes.STRING,
    number: DataTypes.STRING,
    source: DataTypes.STRING,
    format: DataTypes.STRING,
    file: DataTypes.STRING,
    id_user: DataTypes.STRING,
    id_category: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'File',
  });
  return File;
};