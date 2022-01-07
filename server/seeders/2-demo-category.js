'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("categories", [
    {
      name: '여행'
    },
    {
      name: '카페'
    },
    {
      name: '맛집'
    },
    {
      name: '산책'
    },
  ])},

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
