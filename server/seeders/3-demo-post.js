'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("posts", [
      // {
      //   userId: 1,
      //   title: '전체보기에서 보이면 안 되는 게시글',
      //   image: '3351641435347028.jpeg,',
      //   content: '비공개 게시글 테스트',
      //   lat: 0,
      //   lng: 0,
      //   address: '그리고 너는 지옥에 간다',
      //   public: 0,
      //   categoryId: 1
      // },
      {
        userId: 1,
        title: '일광해수욕장 카페 헤이든',
        image: '3351641435347028.jpeg,',
        content: '바다 보면서 커피마시기 좋음',
        lat: 35.2828507,
        lng: 129.2563089,
        address: '부산광역시 기장군 일광면 동백리 449',
        public: 1,
        categoryId: 2
      },
      {
        userId: 1,
        title: '물금역 옆 황산공원',
        image: '3351641435347028.jpeg,',
        content: '얼죽아',
        lat: 35.2985774,
        lng: 128.9895793,
        address: '경상남도 양산시 물금읍 물금리 182-4',
        public: 1,
        categoryId: 4
      },
      {
        userId: 1,
        title: '황령산 전망대',
        image: '3351641435347028.jpeg,',
        content: '여긴 낮보다 밤에 와야 더 좋음 사진맛집',
        lat: 35.1574362,
        lng: 129.0816937,
        address: '부산광역시 연제구 연산2동 2039-1',
        public: 1,
        categoryId: 4
      },
      {
        userId: 2,
        title: '전동성당',
        image: '3351641435347028.jpeg,',
        content: '안에 들어가면 스테인드글라스가 아름다움',
        lat: 35.8133534,
        lng: 127.1487735,
        address: '전라북도 전주시 완산구 전동 태조로 51',
        public: 1,
        categoryId: 1
      },
      {
        userId: 2,
        title: '영도전망대',
        image: '3351641435347028.jpeg,',
        content: '정확히는 전망대보다 좀더 위로 와야 더 좋음',
        lat: 35.087134,
        lng: 129.0575528,
        address: '부산광역시 영도구 청학2동 482-121',
        public: 1,
        categoryId: 1
      },
      {
        userId: 3,
        title: '아하스시 초밥집',
        image: '3351641435347028.jpeg,',
        content: '비싸고 맛있음 예약필수 포장도 됨',
        lat: 35.2293192,
        lng: 129.012598,
        address: '부산광역시 북구 화명동 금곡대로 238',
        public: 1,
        categoryId: 3
      },
      {
        userId: 4,
        title: '짬뽕 먹으러 가기좋은곳',
        image: '3351641435347028.jpeg,',
        content: '이집은 차돌짬뽕이 너무 세서 다른건 전부 조연',
        lat: 35.3178425,
        lng: 128.9888799,
        address: '경상남도 양산시 동면 금산리 1451-16',
        public: 1,
        categoryId: 3
      },
      {
        userId: 1,
        title: '종이냄새 맡으러 갈때',
        image: '3351641435347028.jpeg,',
        content: '책+음반+문구 조금 비싸도 보고 살거면 제일 좋음',
        lat: 35.1515674,
        lng: 129.0573405,
        address: '부산광역시 부산진구 중앙대로 658',
        public: 1,
        categoryId: 4
      },
      {
        userId: 3,
        title: '영도대교 보면서 커피마시기',
        image: '3351641435347028.jpeg,',
        content: '커피 사서 옥상에서 마시면서 볼 수 있음',
        lat: 35.0966363,
        lng: 129.0361791,
        address: '부산광역시 중구 중앙동7가 20-1',
        public: 1,
        categoryId: 2
      },
      {
        userId: 4,
        title: '바다 보면서 밥먹기 좋은곳',
        image: '3351641435347028.jpeg,',
        content: '날씨 빼고 다 좋았음 비만 안왔음 정말 좋았을텐데',
        lat: 35.1596978,
        lng: 129.1660131,
        address: '부산광역시 해운대구 중동 해운대해변로298번길 24',
        public: 1,
        categoryId: 3
      },
      {
        userId: 4,
        title: '호텔 옥상에서 바다 보기 좋음',
        image: '3351641435347028.jpeg,',
        content: '광안대교 보이고 높이도 적당해서 사진찍기 좋음',
        lat: 35.1537516,
        lng: 129.1183094,
        address: '부산광역시 수영구 광안동',
        public: 1,
        categoryId: 1
      },
      {
        userId: 4,
        title: '그냥 길가다 좋아서 찍었는데 사진이 망함',
        image: '3351641435347028.jpeg,',
        content: '역시 최고의 사진기는 두 눈이다',
        lat: 35.338657559738564,
        lng: 129.02510903402634,
        address: '경상남도 양산시 중부동 498-1',
        public: 1,
        categoryId: 4
      },
      {
        userId: 1,
        title: '대구하면 중화비빔밥',
        image: '3351641435347028.jpeg,',
        content: '무난하게 맛있어서 추천. 먹다보면 배불러짐',
        lat: 35.8644536,
        lng: 128.5883948,
        address: '대구광역시 중구 명륜로 20',
        public: 1,
        categoryId: 3
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
