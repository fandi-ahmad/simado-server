'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rapor_file extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rapor_file.belongsTo(models.Student, { foreignKey: 'id_student' })
      Rapor_file.belongsTo(models.Study_year, { foreignKey: 'id_study_year' })
      Rapor_file.belongsTo(models.Class_name, { foreignKey: 'id_class_name' })
    }
  }
  Rapor_file.init({
    id_student: DataTypes.STRING,
    id_study_year: DataTypes.STRING,
    id_class_name: DataTypes.STRING,
    file: DataTypes.STRING,
    semester: DataTypes.ENUM('1', '2'),
  }, {
    sequelize,
    modelName: 'Rapor_file',
  });
  return Rapor_file;
};