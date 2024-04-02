'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.hasMany(models.Rapor_file, { foreignKey: 'id_student' })
      Student.belongsTo(models.Entry_year, { foreignKey: 'id_entry_year' })
    }
  }
  Student.init({
    id_entry_year: DataTypes.STRING,
    nisn: DataTypes.STRING,
    name: DataTypes.STRING,
    ijazah_file: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};