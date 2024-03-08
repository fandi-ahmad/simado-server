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
    }
  }
  Student_file.init({
    id_student: DataTypes.STRING,
    file: DataTypes.STRING,
    file_name: DataTypes.STRING,
    class: DataTypes.STRING,
    semester: DataTypes.STRING,
    category: DataTypes.ENUM('rapor', 'ijazah')
  }, {
    sequelize,
    modelName: 'Student_file',
  });
  return Student_file;
};