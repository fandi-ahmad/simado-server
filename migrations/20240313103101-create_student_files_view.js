'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE VIEW view_student_files AS
      SELECT sf.id, 
             sf.id_student, 
             s.nisn, 
             s.name AS student_name, 
             sf.id_study_year, 
             sy.study_year, 
             sf.id_class_name, 
             cn.class_name, 
             sf.file, 
             sf.file_name, 
             sf.semester, 
             sf.category, 
             sf.createdAt, 
             sf.updatedAt
      FROM student_files sf
      INNER JOIN students s ON sf.id_student = s.id
      INNER JOIN study_years sy ON sf.id_study_year = sy.id
      INNER JOIN class_names cn ON sf.id_class_name = cn.id;
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP VIEW IF EXISTS view_student_files;');
  }
};
