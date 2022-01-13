'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
    {
      email: "test@test",
      password: "test",
      nickname: "Tester",
      image: '3821641965246774.png',
      admin: true,
      oauth: false
    },
    {
      email: "kimcoding@test.com",
      password: "test",
      nickname: "김코딩",
      image: '3821641965246774.png',
      admin: false,
      oauth: false
    },
    {
      email: "parkcoding@test.com",
      password: "test",
      nickname: "박코딩",
      image: '3821641965246774.png',
      admin: false,
      oauth: false
    },
    {
      email: "seungwook74@naver.com",
      password: "test",
      nickname: "이승욱",
      image: '3821641965246774.png',
      admin: false,
      oauth: false
    },
    {
      email: "the_redchicken@hanmail.net",
      password: "test",
      nickname: "서영균",
      image: '3821641965246774.png',
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
