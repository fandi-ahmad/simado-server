'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student_file extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student_file.belongsTo(models.Student, { foreignKey: 'id_student' })
      Student_file.belongsTo(models.Study_year, { foreignKey: 'id_study_year' })
      Student_file.belongsTo(models.Class_name, { foreignKey: 'id_class_name' })
    }
  }
  Student_file.init({
    id_student: DataTypes.STRING,
    id_study_year: DataTypes.STRING,
    id_class_name: DataTypes.STRING,
    file: DataTypes.STRING,
    file_name: DataTypes.STRING,
    semester: DataTypes.ENUM('1', '2'),
    category: DataTypes.ENUM('rapor', 'ijazah')
  }, {
    sequelize,
    modelName: 'Student_file',
  });
  return Student_file;
};