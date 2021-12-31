'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.addConstraint('대상테이블', {
    //   fields: ['대상컬럼이름'],
    //   type: 'foreign key',
    //   name: 'FK_any_name_you_want',
    //   references: {
    //     table: '참조테이블',
    //     field: '참조값'
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade'
    // })
    await queryInterface.addConstraint('comments', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'FK_comment_userId',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
    await queryInterface.addConstraint('comments', {
      fields: ['postId'],
      type: 'foreign key',
      name: 'FK_comments_postId',
      references: {
        table: 'posts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
    await queryInterface.addConstraint('user_post_likes', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'FK_likes_userId',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
    await queryInterface.addConstraint('user_post_likes', {
      fields: ['postId'],
      type: 'foreign key',
      name: 'FK_likes_postId',
      references: {
        table: 'posts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
    await queryInterface.addConstraint('posts', {
      fields: ['categoryId'],
      type: 'foreign key',
      name: 'FK_posts_categoryId',
      references: {
        table: 'categories',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeConstraint('대상테이블', '참조키이름');
    await queryInterface.removeConstraint('comments', 'FK_comment_userId');
    await queryInterface.removeConstraint('comments', 'FK_comments_postId');
    await queryInterface.removeConstraint('user_post_likes', 'FK_likes_userId');
    await queryInterface.removeConstraint('user_post_likes', 'FK_likes_postId');
    await queryInterface.removeConstraint('posts', 'FK_posts_categoryId');
  }
};
