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
      id_study_year: {
        type: Sequelize.UUID,
        references: {
          model: 'Study_years',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      id_class_name: {
        type: Sequelize.UUID,
        references: {
          model: 'Class_names',
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
      semester: {
        type: Sequelize.ENUM('1', '2')
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