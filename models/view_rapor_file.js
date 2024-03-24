'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class View_rapor_file extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  View_rapor_file.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    id_student: DataTypes.UUID,
    nisn: DataTypes.STRING,
    student_name: DataTypes.STRING,
    id_study_year: DataTypes.UUID,
    study_year: DataTypes.STRING,
    id_class_name: DataTypes.UUID,
    class_name: DataTypes.STRING,
    file: DataTypes.STRING,
    semester: DataTypes.ENUM('1', '2'),
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'View_rapor_file',
  });
  return View_rapor_file;
};