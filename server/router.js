const express = require("express");
const router = express.Router(); // 대문자 Router여야 함 조심!
const controllers = require("./controllers");
require("dotenv").config();
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
aws.config = require("./config/awsconfig.js");
const s3 = new aws.S3();

// 로컬에 저장하기 (테스트용, 폴더가 존재해야 업로드됩니다! 없으면 오류발생)
// const upload = multer({ dest: "uploads/" });

// S3에 업로드하기 (지갑을 지켜주세요)
// 사용하려면 config폴더에 awsconfig파일이 있어야 합니다(이미 3퍼 넘게 써버림 ㅎㅎ;)
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'nadri',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read-write',
        key: function(req, file, cb) {
            cb(null, Math.floor(Math.random() * 1000).toString() + Date.now() + '.' + file.originalname.split('.').pop());
        }
    }),
    limits: {
        fileSize: 1000 * 1000 * 10
    }
});

/* ================================================================ */

// 라우터 입력 시작

// auth 라우터

router.post('/auth/code', controllers.code);
router.post('/auth/login', controllers.login);
router.post('/auth/logout', controllers.logout);
router.post('/auth/signup', controllers.signup);
router.delete('/auth/signout', controllers.signout);
// google oauth
router.get('/auth/google', controllers.google.googleLogin)
router.post('/auth/googleCallback', controllers.google.googleCallback)
// kakao oauth
router.get('/auth/kakao', controllers.kakao.kakaoLogin)
router.post('/auth/kakaoCallback', controllers.kakao.kakaoCallback)

// comment 라우터
router.get("/comment", controllers.comment.getUserComment); // 사용자 전체 댓글 조회
router.get("/comment/:id", controllers.comment.getPostComment); // 특정Post댓글 조회
router.post("/comment/:id", controllers.comment.postComment); // 특정Post댓글 작성
router.patch("/comment/:id", controllers.comment.modifyComment); // 특정 댓글 수정
router.delete("/comment/:id", controllers.comment.deleteComment); // 특정 댓글 삭제

// like 라우터
router.get("/like", controllers.like.getLike);
router.post("/like/:id", controllers.like.postLike);

// post 라우터
router.get('/post', controllers.post.getAllPost)
router.get('/post/:id', controllers.post.getOnePost)
router.post(
  "/post",
  upload.fields([
    { name: "image", maxCount: 4 },
    { name: "title", maxCount: 1 },
    { name: "content", maxCount: 1 },
    { name: "lat", maxCount: 1 },
    { name: "lng", maxCount: 1 },
    { name: "address", maxCount: 1 },
    { name: "public", maxCount: 1 },
    { name: "categoryId", maxCount: 1 },
  ]),
  controllers.post.uploadPost
); // 게시글 업로드
router.patch(
  "/post/:id",
  upload.fields([
    { name: "image", maxCount: 4 },
    { name: "title", maxCount: 1 },
    { name: "content", maxCount: 1 },
    { name: "lat", maxCount: 1 },
    { name: "lng", maxCount: 1 },
    { name: "address", maxCount: 1 },
    { name: "public", maxCount: 1 },
    { name: "categoryId", maxCount: 1 },
  ]),
  controllers.post.patchPost
);
router.delete('/post/:id', controllers.post.deletePost)
router.post('/post/report', controllers.post.reportPost )

router.get("/auth/me", controllers.me.getUserInform);
router.patch("/auth/me",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "nickname", maxCount: 1 },
    { name: "password", maxCount: 1 }
  ]),
  controllers.me.patchUserInform
);

// 라우터 입력 끝

// 테스트 라우팅
router.post('/post/image', controllers.post.getPostImg)
router.get('/auth/me/post', controllers.me.getUserPost)

module.exports = router;
