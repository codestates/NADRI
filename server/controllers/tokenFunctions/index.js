require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

/*
    tokenFunctions
    이번에는 Cookie에 저장할 것이므로 인증정보의 저장과 삭제가 모두 쿠키에서 발생
    저장시 쿠키의 설정에 주의해야 함
*/

module.exports = {
  mkAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: '14d' });
  },
  sendAccessToken: (res, accessToken) => {
    res.cookie('authorization', accessToken, {
      // 이거...맞나?
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
  },
  chkValid: (req) => {
    console.log(req.cookies);
    const authorization = req.cookies['authorization'];
    if (!authorization) return null;
    try {
      return verify(authorization, process.env.ACCESS_SECRET);
    } catch (err) {
      console.log('AccessToken ERROR');
      return null;
    }
  },
};
