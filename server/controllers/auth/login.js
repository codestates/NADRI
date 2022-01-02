const { users } = require('../../models');
const { mkAccessToken, sendAccessToken } = require('../tokenFunctions');
require('dotenv').config();

module.exports = async (req, res) => {
  /*
    전송되는 PW는 해싱된 값으로 받는 게 좋을듯
    (프론트엔드 단에서 처리해줘야 함...)
  */
  
  if (!req.body.email) return res.status(400).json({message: 'Wrong ID'})
  if (!req.body.password) return res.status(400).json({message: 'Wrong Password'})

  const userInfo = await users.findOne({
    where: { email: req.body.email },
  });
  // 유저정보가 없으면 오류 반환
  if (!userInfo) return res.status(400).json({message: 'Wrong ID'})
  if (userInfo.password !== req.body.password) return res.status(400).json({message: 'Wrong Password'})

  try { // 유저정보가 있으면? > 중요정보를 삭제하고 사인 후 전달
    const payLoad = userInfo.dataValues;
    delete payLoad.password

    const aToken = mkAccessToken(payLoad)
    sendAccessToken(res, aToken)
    res.sendStatus(200)
  } catch (err) {
    res.status(500).json({message: 'Internel Server Error'})
  }
};
