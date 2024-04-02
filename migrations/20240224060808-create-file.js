'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      file: {
        type: Sequelize.STRING
      },
      file_name: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.STRING
      },
      format: {
        type: Sequelize.STRING
      },
      id_category: {
        type: Sequelize.UUID,
        allowNull:false,
        references: {
          model: 'Category_files',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Files');
  }
};