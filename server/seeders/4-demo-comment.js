'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("comments", [
      {
        userId: 2,
        postId: 1,
        comment: '여기 추천메뉴좀 알려주세요'
      },
      {
        userId: 1,
        postId: 1,
        comment: '저는 단팥빵에 아메리카노 먹었습니다. 조합 잘맞더라고요'
      },
      {
        userId: 4,
        postId: 1,
        comment: '여기 진짜 좋음 저녁쯤에 가면 노을진것도 보기 좋고'
      },
      {
        userId: 2,
        postId: 2,
        comment: '얼죽아는 얼어죽을 감기걸림'
      },
      {
        userId: 3,
        postId: 2,
        comment: '며칠전에 가보니까 오토캠핑장에 사람 많던데'
      },
      {
        userId: 5,
        postId: 2,
        comment: '오토캠핑장 사람 많을때 가니까 좀 불안함'
      },
      {
        userId: 3,
        postId: 3,
        comment: '여기 차 없으면 절대 못올라옴 대체 얼마나 높은거야'
      },
      {
        userId: 2,
        postId: 3,
        comment: '사진 보고 갔는데 비와서 망함'
      },
      {
        userId: 4,
        postId: 4,
        comment: '사진찍기에는 안에 너무 조용해서 살짝 구경만 하고 나옴. 멋있긴 하더라'
      },
      {
        userId: 2,
        postId: 4,
        comment: '안에 안들어가도 밖에서도 벽돌이 하얘서 보기 좋음'
      },
      {
        userId: 5,
        postId: 5,
        comment: '전망대는 북항 쪽 보기가 좋고 이 위치면 다리 보기가 좋음'
      },
      {
        userId: 1,
        postId: 5,
        comment: '여기도 차 없으면 못올라올텐데 전망은 막 찾아가서 볼만큼은 아닌듯'
      },
      {
        userId: 4,
        postId: 6,
        comment: '여기 돈값 제대로 함 가격 부담되면 포장으로 먹자'
      },
      {
        userId: 1,
        postId: 6,
        comment: '예약 안하고 갈뻔...'
      },
      {
        userId: 5,
        postId: 6,
        comment: '집앞인데도 자주 못감'
      },
      {
        userId: 1,
        postId: 7,
        comment: '이집 차돌짬뽕은 참 든든하단 말이야 국물도 뻑뻑하고 고기도 많이 들었어'
      },
      {
        userId: 3,
        postId: 7,
        comment: '바로앞이 수질정화공원이던데 여름에는 오기 힘들듯'
      },
      {
        userId: 3,
        postId: 8,
        comment: '누가 서면에 책보러가냐ㅋㅋㅋㅋㅋㅋ'
      },
      {
        userId: 3,
        postId: 9,
        comment: '잠깐 나왔다가 들러봤는데 바람쐬면서 커피먹기는 좋은듯'
      },
      {
        userId: 1,
        postId: 9,
        comment: '주말에 갔는데 사람 너무 많아서 마스크빼고 커피먹기 부담스러움'
      },
      {
        userId: 1,
        postId: 10,
        comment: '"비싸"'
      },
      {
        userId: 2,
        postId: 10,
        comment: '여기 맥주가 맛집입니다. 두번드세요 감바스도 맛있음'
      },
      {
        userId: 3,
        postId: 11,
        comment: '야경 기대하고 갔다가 비와서 좀 아쉽긴 했는데 낮에도 좋았음'
      },
      {
        userId: 2,
        postId: 11,
        comment: '비 안오면 정말 좋은곳인데 아쉽다'
      },
      {
        userId: 1,
        postId: 12,
        comment: '?'
      },
      {
        userId: 4,
        postId: 13,
        comment: '마 니 중비 무밨나! 함무바라!'
      },
      {
        userId: 3,
        postId: 13,
        comment: '이집 말고 경북대 북문쪽에 있는 가게가 더 잘함'
      },
      {
        userId: 4,
        postId: 13,
        comment: '여기 좀 짜던데 나만 그랬나'
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
