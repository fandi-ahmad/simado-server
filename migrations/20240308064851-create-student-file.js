'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Student_files', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      id_student: {
        type: Sequelize.UUID,
        allowNull:false,
        references: {
          model: 'Students',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      file: {
        type: Sequelize.STRING
      },
      file_name: {
        type: Sequelize.STRING
      },
      class: {
        type: Sequelize.STRING
      },
      semester: {
        type: Sequelize.STRING
      },
      category: {
        allowNull: false,
        defaultValue: 'rapor',
        type: Sequelize.ENUM('rapor', 'ijazah')
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
    await queryInterface.dropTable('Student_files');
  }
};