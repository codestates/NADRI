const { users } = require("../../models");
const {
  mkAccessToken,
  sendAccessToken,
  verifyPW,
} = require("../tokenFunctions");
require("dotenv").config();

module.exports = async (req, res) => {
  if (!req.body.email) return res.status(400).json({ message: "Wrong ID" });
  if (!req.body.password)
    return res.status(400).json({ message: "Wrong Password" });

  const userInfo = await users.findOne({
    where: { email: req.body.email },
  });

  // 유저정보가 없으면 오류 반환
  if (!userInfo) return res.status(400).json({ message: "Wrong ID" });

  // 비밀번호는 검증이 실패하면 오류 반환
  const result = verifyPW(req.body.password, userInfo.password)
  if (!result)
    return res.status(400).json({ message: "Wrong Password" });

  // 로컬용 평문 PW 검증
  // if (userInfo.password !== req.body.password) return res.status(400).json({ message: "Wrong Password" });

  try {
    // 유저정보가 있으면? > 중요정보를 삭제하고 사인 후 전달
    const payLoad = userInfo.dataValues;
    delete payLoad.password;
    delete payLoad.updatedAt;
    const aToken = mkAccessToken(payLoad);
    sendAccessToken(res, aToken);
    console.log(payLoad);
    res.status(200).json({ data: payLoad });
  } catch (err) {
    res.sendStatus(500);
  }
};
