const { users } = require('../../models');
const { mkAccessToken, sendAccessToken, encryptPW } = require('../tokenFunctions');
require('dotenv').config;

module.exports = async (req, res) => {
  const { email, nickname, password } = req.body;

  if (!email || !nickname || !password) return res.status(400).json({message: 'Not Enough Data'})

  const find = await users.findOne({
    where: {email}
  })

  if (find) return res.status(400).json({message: 'Already Signed Up!'})

  try {
    // const hashed = encryptPW(password)
    // console.log('hashPW', hashed)

    const created = await users.create({
      // 클라이언트 단에서 비번을 해싱해서 보내는게 맞지 않을까?
      // 받아온 값으로 bcrypt를 돌린다던가
    
      nickname,
      email,
      password: password, // 나중에 실제서비스 올라가면 hashed로 변경
      image: '2111641961096892.jpeg,', // 기본 이미지를 버킷에 넣고 주소 저장하기 (지갑을 지켜주세요...)
      admin: false, // 어드민 권한은 기본적으로 false 주기
      oauth: false, // 일반 회원가입이므로 false
    })

    const userData = created.dataValues
    delete userData.password
    console.log('회원가입', userData)
    const accessToken = mkAccessToken(created.dataValues)
    sendAccessToken(res, accessToken)
    // console.log(accessToken)
    res.status(201).json({data: userData})
    
  } catch (error) {
    console.log('signup internal err')
    res.sendStatus(500)
  }
};
