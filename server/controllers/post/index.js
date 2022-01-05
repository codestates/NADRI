/*
  form을 통한 이미지 파일 업로드 테스트 파일
*/

const { QueryTypes } = require("sequelize");
const { posts, comments, user_post_likes, sequelize } = require("../../models");
const { chkValid } = require("../tokenFunctions");
const aws = require("aws-sdk");
aws.config = require("../../config/awsconfig.js");
const s3 = new aws.S3();

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
      SELECT id, title, image, content, lat, lng, address, public, categoryId FROM posts WHERE posts.public = 1
    `, { type: QueryTypes.SELECT })

    // 비공개 게시글은 그냥 메인화면에서 아예 안보이게 하는게 맞나?

    res.status(200).json({data: find})
  },

  getOnePost: async (req, res) => {
    // 댓글 / like 개수 카운트 서브쿼리 추가 필요
    // 500 오류 추가 필요
    // 작성자인지 여부 확인 > 맞으면 전체정보
    // 작성자가 아닌데 비공개면 400 bad req 반환?

    // 전달받은 파라미터로 포스트가 존재하는지 확인
    const id = req.params.id
    const find = await sequelize.query(`
      SELECT * FROM posts WHERE posts.id = ${id} AND posts.public = 1
    `, { type: QueryTypes.SELECT })

    // find가 빈 배열이면 = 없는 포스트면 404를 반환
    if (!find[0]) return res.sendStatus(404)

    // 포스트의 정보 반환
    res.status(200).json({data: find[0]})

    // 찾은 포스트의 like 개수 찾기
    // 찾은 포스트의 댓글 찾기
    // 만든 정보 전달하기(이미지 어떻게 전달할지 생각해야 함.)
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

  patchPost: async (req, res) => {},

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
