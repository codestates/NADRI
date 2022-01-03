/*
  form을 통한 이미지 파일 업로드 테스트 파일
*/
const { posts } = require("../../models");
const { chkValid } = require('../tokenFunctions')

module.exports = {
  upload: async (req, res) => {

    // 유저정보 인증: 로그인페이지 작동하면 주석 해제
    // const userData = chkValid(req)
    // if (!userData) return res.status(400).json({message: 'Invalid Token'})
    
    // req.files > 이미지 정보 저장
    // req.body > 텍스트가 저장된 필드 전부 (주의: 뭔지모를 객체 하나 있어서 req를 분해할당해야 활용에 지장 없을듯)
    // console.log(req.files); // 파일의 정보 출력
    // console.log(req.body);

    // 이미지 파일이 없을 경우 400
    if (!req.files) return res.status(400).json({message: 'Bad request'})

    // 이미지 정보 추출
    const image = req.files['image'];
    let path
    if (image.location) path = image.map((img) => img.location)
    path = image.map((img) => img.path)

    // console.log(path); // 배열 형태로 저장된 이미지 경로 출력

    const {title, content, lat, lng, address, public, categoryId} = req.body
    let url = ''
    path.map(e => url += `${e},`)

    await posts.create({
      userId: 1, // 인증단계 거쳐서 id 추출해야 함. 테스트 끝나면 반드시 수정할것
      title,
      image: url, // 다중 이미지의 경우 어떻게 처리해야 할지 생각해야 함
      content,
      lat: Number(lat),
      lng: Number(lng),
      address,
      public: JSON.parse(public),
      categoryId: Number(categoryId)
    })
    .then(() => {
      res.sendStatus(201)
    })
    .catch(() => {
      res.sendStatus(500)
    })
  },
};
