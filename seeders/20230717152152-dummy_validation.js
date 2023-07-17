'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('OTP_validations', [{
        email: 'grantcardone@gmal.com',
        code: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});

  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('OTP_validations', null, {});
  }
};
