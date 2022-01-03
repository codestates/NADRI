const { users } = require('../../models');
const { chkValid } = require('../tokenFunctions');
require('dotenv').config;

module.exports = async (req, res) => {

  if (!req.cookies.authorization) return res.status(400).json({message: 'No Authorization Data'}) // 인증정보가 없을때의 오류메세지

  const userData = chkValid(req)

  if (!userData) return res.status(400).json({message: 'Authroization Verify Failed'}) // 인증정보 확인 실패 오류메세지

  console.log(userData)

  try {
    users.destroy({where: {email: userData.email}})
    .then(() => {
      res.clearCookie('authorization', {secure: true, sameSite: 'none'})
      return res.sendStatus(200)
    })
  } catch (err) {
    return res.sendStatus(500)
  }
}