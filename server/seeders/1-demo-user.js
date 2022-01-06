'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
    {
      email: "test@test.com",
      password: "test",
      nickname: "Tester",
      image: null,
      admin: true,
      oauth: false
    },
    {
      email: "kimcoding@test.com",
      password: "test",
      nickname: "김코딩",
      image: null,
      admin: false,
      oauth: false
    },
    {
      email: "parkcoding@test.com",
      password: "test",
      nickname: "박코딩",
      image: null,
      admin: false,
      oauth: false
    },
    {
      email: "seungwook74@naver.com",
      password: "test",
      nickname: "이승욱",
      image: null,
      admin: false,
      oauth: false
    },
    {
      email: "the_redchicken@hanmail.net",
      password: "test",
      nickname: "서영균",
      image: null,
      admin: false,
      oauth: false
    },
  ])
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
