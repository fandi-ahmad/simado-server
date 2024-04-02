'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class_name extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Class_name.hasMany(models.Rapor_file, { foreignKey: 'id_class_name' })
    }
  }
  Class_name.init({
    class_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Class_name',
  });
  return Class_name;
};