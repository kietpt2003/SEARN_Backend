'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: "admin@gmail.com",
      password: "12345",
      firstName: "Tuan Kiet",
      lastName: "Pham",
      address: "Test Address",
      phoneNumber: '0772175292',
      gender: 1,
      image: null,
      roleId: 'R1',
      positionId: 'doctor',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
