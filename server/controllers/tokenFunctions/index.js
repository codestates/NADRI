require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');
const bcrypt = require('bcrypt')

/*
    tokenFunctions
    이번에는 Cookie에 저장할 것이므로 인증정보의 저장과 삭제가 모두 쿠키에서 발생
    저장시 쿠키의 설정에 주의해야 함

    Bcrypt salt는 10으로 두기(너무 크면 연산에 시간이 오래 걸림)
*/

module.exports = {
  mkAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '14d' });
  },
  sendAccessToken: (res, accessToken) => {
    console.log(accessToken)
    res.cookie('authorization', accessToken, {
      sameSite:'none',
      secure: true,
      httpOnly: true
    });
  },
  chkValid: (req) => {
    const authorization = req.cookies['authorization'];
    if (!authorization) return null;
    try {
      return verify(authorization, process.env.ACCESS_SECRET);
    } catch (err) {
      console.log('AccessToken ERROR');
      return null;
    }
  },
  encryptPW: (plainText) => {
    const enc = bcrypt.hashSync(plainText, 10)
    return enc
  },
  verifyPW: (inputPW, hashedPW) => {
    const result = bcrypt.compareSync(inputPW, hashedPW)
    console.log("COMPARE", result)
    return result
  }
};
