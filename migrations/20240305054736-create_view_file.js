'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(/*sql*/`
      CREATE OR REPLACE VIEW view_files AS
      SELECT files.id, files.file, files.file_name, files.number, files.source, files.format, files.createdAt, files.updatedAt, category_files.id AS id_category, category_files.name AS category_name
      FROM files
      LEFT JOIN category_files ON files.id_category = category_files.id;
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('DROP VIEW IF EXISTS view_files');
  }
};
