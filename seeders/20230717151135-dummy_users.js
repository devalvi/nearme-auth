'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
       email: 'JohnDoe@qenf.we',
       password: 'hfviluehf9e',
       createdAt: new Date(),
       updatedAt: new Date()
    },
  {
    email: "grantcardone@gmail.com",
    password: 'hashdekdfojve',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  },  

  async down (queryInterface, Sequelize) {

  await queryInterface.bulkDelete('Users', null, {});
  }
};
