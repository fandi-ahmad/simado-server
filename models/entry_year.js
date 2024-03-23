'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entry_year extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Entry_year.hasMany(models.Student, { foreignKey: 'id_entry_year' })
    }
  }
  Entry_year.init({
    year: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Entry_year',
  });
  return Entry_year;
};