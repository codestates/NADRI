const { mkAccessToken, sendAccessToken, chkValid, encryptPW } = require('../tokenFunctions')
const { users, posts } = require('../../models');
const { rmSync } = require('fs');
const aws = require("aws-sdk");
aws.config = require("../../config/awsconfig.js");
const s3 = new aws.S3();

module.exports = {
  getUserInform: (req, res) => {
    // 새로고침 시 정보요청을 받으므로 쿠키 확인이 안될 시 HTTP 204를 반환
    if (!req.cookies['authorization']) return res.status(204).json({message: 'No Data'})
    // 인증정보가 유효한지 확인
    const userData = chkValid(req)
    if (!userData) res.status(400).json({message: 'Invalid token'})

    // 데이터 반환
    try{
      res.status(200).json({data: userData})
    } catch (err) {
      res.sendStatus(500)
    }
  },

  patchUserInform: async (req, res) => {

    // 인증정보가 있는지 확인
    if (!req.cookies['authorization']) return res.status(400).json({message: 'Bad Request'})
    // 인증정보가 유효한지 확인
    const userData = chkValid(req)
    if (!userData) res.status(400).json({message: 'Invalid token'})
    
    try {
      // 인증 완료 > 정보 업데이트
      let path = null
      if (Boolean(req.files)) {
        const image = req.files['profile'];
        if (image[0].location) path = image.map((img) => img.key);
        else path = image.map((img) => img.path)
      }

      if (userData.image !== '2201642736516031.png') { // 기본이미지 아닐때만 삭제
        // 이미지가 변경되었으면 이전 이미지를 삭제해야 함.
        s3.deleteObject({ Bucket: "nadri", Key: userData.image }, (err, data) => {
          if (err) {
            throw err;
          }
          console.log('s3 deleteObject ', data);
        });
      }

      const {nickname, password} = req.body

      // 변경할 닉네임으로 이미 등록된 유저가 있는지 확인하기
      if (nickname) {
        const chkNickname = await users.findOne({where: {nickname}})
        if (chkNickname) return res.status(400).json({message: 'Already used nickname. Try another one'})
      }

      // 데이터베이스에 반영
      const find = await users.findOne({ where: { email: userData['email'] } })
      if (nickname) find.nickname = nickname
      if (password) find.password = encryptPW(password)
      if (path) {
        let imgStr = "";
        path.map((e) => (imgStr += `${e}`));
        find.image = imgStr
      }
      await find.save()

      const result = find.dataValues

      delete result.password;

      console.log(result)

      // 변경된 정보를 가지고 토큰을 갱신해 줘야 함.
      const newAccessToken = mkAccessToken(result)
      sendAccessToken(res, newAccessToken)

      // return res.status(200).send(path[0])
      return res.status(200).json({data: result});
    } catch (err) {
      console.log(err)
      return res.sendStatus(500)
    }
  },

  getUserPost: async (req, res) => {

     // 인증정보가 있는지 확인
    if (!req.cookies['authorization']) return res.status(400).json({message: 'Bad Request'})

    // 인증정보가 유효한지 확인
    const userData = chkValid(req)
    // console.log(userData)
    if (!userData) res.status(400).json({message: 'Invalid token'})

    try {

      const userPost = await posts.findAll({
        where: {
          userId: userData.id,
        },
        order: [['createdAt', 'DESC']]
      })
      console.log('유저포스트')
      console.log(userPost);
      userPost.map(e => e.dataValues.image = process.env.AWS_CLOUD_URL + e.image.split(',')[0] )
      userPost.map(e => e.dataValues.createdAt = e.dataValues.createdAt.split(' ')[0])

      if(userPost.length ===0){
        return res.status(200).json({data:null, message: '작성한 글이 없어요'})
      }
      res.status(200).json({data: userPost})

    } catch (error) {
      console.log('getUserPost 500 err')
      res.sendStatus(500)
    }
  },
}