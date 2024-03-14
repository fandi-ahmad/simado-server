'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Study_year extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Study_year.hasMany(models.Student_file, { foreignKey: 'id_study_year' })
    }
  }
  Study_year.init({
    study_year: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Study_year',
  });
  return Study_year;
};