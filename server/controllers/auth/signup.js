const { users } = require('../../models');
const { mkAccessToken, sendAccessToken, encryptPW } = require('../tokenFunctions');
require('dotenv').config;

module.exports = async (req, res) => {
  const { email, nickname, password } = req.body;

  if (!email || !nickname || !password) return res.status(400).json({message: 'Not Enough Data'})

  const find = await users.findOne({
    where: {email}
  })

  if (find) return res.status(400).send('이미 가입한 사용자입니다!')

  // 변경할 닉네임으로 이미 등록된 유저가 있는지 확인하기
  const chkNickname = await users.findOne({where: {nickname}})
  if (chkNickname) return res.status(400).send('이미 사용중인 닉네임입니다!')

  try {
    const hashed = encryptPW(password)

    const created = await users.create({
      nickname,
      email,
      password: hashed,
      image: 'default-profile.png', // 기본 이미지를 버킷에 넣고 주소 저장하기
      admin: false, // 어드민 권한은 기본적으로 false 주기
      oauth: false, // 일반 회원가입이므로 false
    })

    const userData = created.dataValues
    delete userData.password

    console.log('회원가입', userData)
    const accessToken = mkAccessToken(created.dataValues)
    sendAccessToken(res, accessToken)

    res.status(201).json({data: userData})
    
  } catch (error) {
    console.log('signup internal err')
    res.sendStatus(500)
  }
};
