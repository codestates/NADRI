/*
  form을 통한 이미지 파일 업로드 테스트 파일
*/

const { QueryTypes } = require("sequelize");
const { posts, sequelize } = require("../../models");
const { chkValid } = require("../tokenFunctions");
const aws = require("aws-sdk");
aws.config = require("../../config/awsconfig.js");
const s3 = new aws.S3();
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  getAllPost: async (req, res) => {
    // 모든 게시글 전송: 현재위치에서의 거리 계산해야 함.
    // 거리계산 API 활용해도 모든 점의 거리를 계산하는것은 좋은 생각이 아닌데

    // 처음에는 자기위치 기준 5km 안의 좌표를 보여주고
    // 클릭해서 위치 지정이 되면 그 좌표를 기준으로 변경

    // 단계별 구현
    // step1: 일단 모든 게시글 (+ 각 게시글의 like 개수 + 각 게시글의 comment 개수 보내기)
    // step2: 좌표값 기준으로 +- 1? (경/위도 차이를 고려해야 함)
    // step3: 카카오 api로 각 좌표 사이의 거리(폴리라인?응용?) 해서 보여주기?

    // step1
    let find = await sequelize.query(`
      SELECT id, title, image, content, lat, lng, address, public, categoryId
      FROM posts
      WHERE posts.public = 1
    `, { type: QueryTypes.SELECT })

    // 비공개 게시글은 그냥 메인화면에서 아예 안보이게 하는게 맞나?
    find.map((point) => {
      point.image = point.image.split(",");
      point.image.pop();
      point.image = point.image.map((e) => (e = process.env.AWS_LOCATION + e));
    });

    res.status(200).json({data: find})
  },

  getOnePost: async (req, res) => {
    /*
    1. 파라미터에 있는 포스트가 존재하는지 확인
      > 유저-포스트-like 연결해 정보 찾기
      > 없으면 404에러
    2. 비공개 글이면 인증 정보 체크
      > 실패 시 401에러
    3. 댓글은 comment api 활용해 따로 전송
    */
    // 전달받은 파라미터로 포스트가 존재하는지 확인
    const id = req.params.id;
    let find = await sequelize.query(`
      SELECT id, userId, title, image, content, lat, lng, address, createdAt, public, categoryId,
        (SELECT nickname FROM users WHERE users.id = posts.userId) AS nickname,
        (SELECT image FROM users WHERE users.id = posts.userId) AS userImage,
        (SELECT COUNT(userId) FROM user_post_likes WHERE user_post_likes.postId = ${id}) AS likes
      FROM posts WHERE posts.id = ${id}
    `,
      { type: QueryTypes.SELECT }
    );
    
    // find가 빈 배열이면 = 없는 포스트면 404를 반환
    if (!find[0]) return res.sendStatus(404);

    // find에 값이 있으면 [0]번을 꺼내 재할당
    find = find[0];

    // public이 false이면 인증정보 확인
    if (!find.public) {
      const userData = chkValid(req)
      if (!userData || find.userId !== userData.id) return res.sendStatus(404)
      console.log('chkUserID', find.userId !== userData.id)
    }

    // 게시글 이미지 링크 처리
    find.image = find.image.split(",");
    find.image.pop();
    find.image = find.image.map((e) => (e = process.env.AWS_LOCATION + e));

    // 유저 이미지 링크 처리
    find.userImage = `${process.env.AWS_LOCATION}` + find.userImage

    // 포스트의 정보 반환
    res.status(200).json({ data: find });

    // 본인이 like한 정보는 getAllPost에서 보내서 props로 내려주는 편이 좋을듯
    // 
  },

  uploadPost: async (req, res) => {
    // 유저정보 인증: 로그인페이지 작동하면 주석 해제
    const userData = chkValid(req);
    if (!userData) return res.status(400).json({ message: 'Invalid Token' });

    // req.files > 이미지 정보 저장
    // req.body > 텍스트가 저장된 필드 전부 (주의: 뭔지모를 객체 하나 있어서 req를 분해할당해야 활용에 지장 없을듯)
    console.log(req.files); // 파일의 정보 출력
    // console.log(req.body);

    // 이미지 파일이 없을 경우 400
    if (!req.files) return res.status(400).json({ message: "Bad request" });

    // 이미지 정보 추출
    const image = req.files["image"];
    let path;

    if (!image) return res.status(400).json({message: 'No Image'})

    if (image[0].location) path = image.map((img) => img.key);
    else path = image.map((img) => img.path);

    console.log(path); // 배열 형태로 저장된 이미지 경로 출력

    console.log(req.body);

    const { title, content, lat, lng, address, public, categoryId } = req.body;

    let imgStr = "";
    path.map((e) => (imgStr += `${e},`));

    console.log(parseFloat(lat));

    await posts
      .create({
        userId: 1, // 인증단계 거쳐서 id 추출해야 함. 테스트 끝나면 반드시 수정할것
        title,
        image: imgStr, // 다중 이미지의 경우 어떻게 처리해야 할지 생각해야 함
        content,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        address,
        public: JSON.parse(public),
        categoryId: Number(categoryId),
      })
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  patchPost: async (req, res) => {
    // 수정버튼 클릭 > 데이터 받아가기 > 수정된데이터 업로드 > DB에 반영
    // 클라이언트 > getOnePost > patchPost > DB가 처리

    // 유저가 로그인된 상태인지(토큰에 정보가 있는지)
    const userData = chkValid(req)
    if (!userData) return res.status(400).json({message: 'Invalid Token'})

    console.log('로그인 검증 완료')

    // 게시글이 존재하는지(데이터 꺼내오기)
    const id = req.params.id
    const find = await posts.findOne({where: {id}})
    if (!find) return res.status(400).json({message: 'Bad Request1'})

    console.log('게시글 확인 완료')

    // 수정 권한이 있는지 확인(본인 or admin)
    if (!userData.admin && find.userId !== userData.id) return res.status(400).json({message: 'Bad Request2'})

    console.log('수정권한 확인 완료')

    // 변경할 값 저장하는 객체 선언
    const mod = {}

    // 이미지 정보 추출(로컬-S3 공용)
    try {
      let path, imgStr = ''
      if (req.files.image) {
        const image = req.files["image"];
        if (!!image[0].location) path = image.map((img) => img.key);
        else path = image.map((img) => img.path);
        path.map((e) => {imgStr += `${e},`});
      }

      console.log('이미지 추출 완료')

      // 이미지 변경사항은 바로 반영
      if (imgStr) {
        // console.log(imgStr); // 문자열+콤마 형태로 저장된 이미지 경로 출력
        // 다운받은 파일을 다시 업로드해도 이름이 달라짐 > 그냥 전부 삭제하고 새로 보내는 게 낫다
        // 대신 post올릴때 부분변경 가능하게 formData 수정 필요

        // S3버킷에서 파일을 삭제하기. DB업데이트는 body 처리할때 진행
        await find.image.split(",").map((e) => {
          if (!e) return null;
          s3.deleteObject({ Bucket: "nadri", Key: `${e}` }, (err, data) => {
            if (err) {
              throw err;
            }
            // console.log('s3 deleteObject ', data);
          });
        })
        // mod['image'] = imgStr
      }

      console.log('이미지 변경 완료')

      // Body 변경점 찾아서 추가
      for (let i of Object.keys(req.body)) {
        if (req.body[`${i}`]) mod[`${i}`] = req.body[`${i}`]
      }

      console.log('Body 수정 데이터 확인')

      // mod.lat ? mod.lat = parseFloat(mod.lat) : null
      // mod.lng ? mod.lng = parseFloat(mod.lng) : null
      // mod.categoryId ? mod.categoryId = Number(mod.categoryId) : null
      // mod.public ? mod.public = Boolean(mod.public) : null
      // console.log(mod)

      console.log('Body 수정 데이터 검증')

      // DB에 반영하기
      // await posts.update(mod, {where: {id}})
      await posts.update({
        title: req.body.title,
        content: req.body.content,
        image: imgStr,
        lat: req.body.lat,
        lng: req.body.lng,
        address: req.body.address,
        public: req.body.public,
        categoryId: req.body.categoryId,

      }, {where: {id : req.params.id}})

      console.log('DB에 저장')

      // 수정되었으면 응답 반환하기
      return res.sendStatus(200)
    } catch (err) {
      // 에러 있으면 코드 반환: catch (err)
      // 오류 시 올라와버린 이미지는 전체 삭제해주는게 맞을듯 
      console.log(err)
      res.sendStatus(500)
    }  
  },

  deletePost: async (req, res) => {
    // 게시글의 작성자 = 삭제를 요청한 유저 일때만 OK

    // 토큰이 없을 때
    if (!req.cookies["authorization"])
      return res.status(400).json({ message: "No Token" });

    // 토큰에서 유저정보 추출: 실패 시
    const userData = chkValid(req);
    if (!userData) return res.status(400).json({ message: "Invalid Token" });

    // DB에서 게시글 찾기: 실패 시
    const find = await posts.findOne({ where: { id: req.params.id } });
    if (!find) return res.status(400).json({ message: "Bad Request" });

    // 찾은 게시글 작성자 !== 요청한 유저 일때
    const postData = find.dataValues;
    // console.log(postData.userId, userData.id);
    if (postData.userId !== userData.id)
      return res.status(400).json({ message: "No Ownership" });

    try {
      // S3버킷에서 파일을 삭제한 뒤 DB에서 제거해야 함
      // console.log(postData.image.split(','));

      await postData.image.split(",").map((e) => {
        if (!e) return null;
        s3.deleteObject({ Bucket: "nadri", Key: `${e}` }, (err, data) => {
          if (err) {
            throw err;
          }
          // console.log('s3 deleteObject ', data);
        });
      });

      // DB에서도 삭제
      posts.destroy({ where: { id: postData.id } });
    } catch (err) {
      res.sendStatus(500);
    }
    res.sendStatus(200);
  },
};
