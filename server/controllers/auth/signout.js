const { users, posts, comments, user_post_likes } = require('../../models');
const { chkValid } = require('../tokenFunctions');
require('dotenv').config;
const aws = require("aws-sdk");
aws.config = require("../../config/awsconfig.js");
const s3 = new aws.S3();

module.exports = async (req, res) => {

  if (!req.cookies.authorization) return res.status(400).json({message: 'No Authorization Data'}) // 인증정보가 없을때의 오류메세지

  const userData = chkValid(req)

  if (!userData) return res.status(400).json({message: 'Authroization Verify Failed'}) // 인증정보 확인 실패 오류메세지

  console.log(userData)

  try {

    const userPost = await posts.findAll({where: {userId: userData.id}, raw: true})
    // console.log(userPost)
    let rmImgArr = ''
    userPost.map(e => rmImgArr += e.image)
    console.log(rmImgArr)

    // OAuth는 이미지를 삭제할 필요가 없으니 서버에 저장된 경우만 
    if (userData.image.slice(0, 4) !== 'http') {
      rmImgArr += userData.image
    }

    // rmImgArr = rmImgArr.split(',')
    console.log(rmImgArr)
    
    await rmImgArr.split(',').map((e) => {
      if (!e) return null;
      console.log('DEL_TARGET',e)
      s3.deleteObject({ Bucket: "nadri", Key: `${e}` }, (err, data) => {
        if (err) {
          throw err;
        }
        console.log('s3 deleteObject ', data);
      });
    })

    // 탈퇴 시 모든 테이블에서 유저의 정보가 있는 컬럼을 삭제해야 함.
    const targetTables = [posts, comments, user_post_likes]
    for (let i of targetTables) {
      await i.destroy({where: {userId: userData.id}})
    }

    users.destroy({where: {email: userData.email}})
    .then(() => {
      res.clearCookie('authorization', {
        httpOnly: true,
        secure: true, 
        sameSite: 'none',
      })
      return res.status(200).send({message: 'User Deleted'})
    })
  } catch (err) {
    return res.sendStatus(500)
  }
}