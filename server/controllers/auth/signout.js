const { users, posts, comments, user_post_likes } = require('../../models');
const { chkValid } = require('../tokenFunctions');
require('dotenv').config;

module.exports = async (req, res) => {

  if (!req.cookies.authorization) return res.status(400).json({message: 'No Authorization Data'}) // 인증정보가 없을때의 오류메세지

  const userData = chkValid(req)

  if (!userData) return res.status(400).json({message: 'Authroization Verify Failed'}) // 인증정보 확인 실패 오류메세지

  console.log(userData)

  try {

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
      return res.status(200).send({message: 'User deleted'})
    })
  } catch (err) {
    return res.sendStatus(500)
  }
}