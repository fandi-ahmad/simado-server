'use strict';
const { v4: uuidv4 } = require('uuid')
const { genSalt, hash } = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const randomUUID = uuidv4()
    const salt = await genSalt()
    const hashPassword = await hash('12345678', salt)
    return queryInterface.bulkInsert('Users', [
      {
        id: randomUUID,
        username: 'demouser',
        password: hashPassword,
        role: 'operator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
