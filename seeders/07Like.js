'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('likes', [
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 1,
      PostId: 7,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 1,
      PostId: 8,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 1,
      PostId: 9,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 2,
      PostId: 8,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 2,
      PostId: 9,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 2,
      PostId: 10,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 3,
      PostId: 7,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 3,
      PostId: 9,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 3,
      PostId: 11,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      UserId: 5,
      PostId: 11,
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
