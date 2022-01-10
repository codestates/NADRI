const { chkValid } = require("../tokenFunctions");

module.exports = (req, res) => {

  // 유저정보 검증: 실패 시 null 반환
  const userData = chkValid(req);
  
  // 유저정보가 null이면 HTTP 401 반환
  if (!userData) { return res.sendStatus(401) }

  // 쿠키의 정보 삭제: 에러 발생시 500 반환
  try {
    res.clearCookie('authorization');
    res.status(200).send({message: 'Logout successful'})
  } catch (error) {
    console.log('Logout Cookie Error')
    res.sendStatus(500)
  }
};
