'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class View_file extends Model {
   
    static associate(models) {
      
    }
  }
  
  View_file.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    file: DataTypes.STRING,
    file_name: DataTypes.STRING,
    number: DataTypes.STRING,
    source: DataTypes.STRING,
    format: DataTypes.STRING,
    year: DataTypes.STRING,
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
    username: DataTypes.STRING,
    id_category: DataTypes.STRING,
    category_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'view_file',
    timestamps: false
  });
  return View_file;
};