'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(/*sql*/`
      CREATE VIEW view_rapor_files AS
      SELECT sf.id, 
             sf.id_student, 
             sf.file, 
             sf.semester, 
             sf.createdAt, 
             sf.updatedAt,
             s.nisn, 
             s.name AS student_name, 
             ey.year AS entry_year,
             sf.id_study_year, 
             sy.study_year, 
             sf.id_class_name, 
             cn.class_name
      FROM rapor_files sf
      LEFT JOIN students s ON sf.id_student = s.id
      LEFT JOIN study_years sy ON sf.id_study_year = sy.id
      LEFT JOIN class_names cn ON sf.id_class_name = cn.id
      LEFT JOIN entry_years ey ON s.id_entry_year = ey.id;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP VIEW IF EXISTS view_rapor_files;');
  }
};
