const { chkValid } = require("../tokenFunctions");

module.exports = (req, res) => {
  const isVaildToken = chkValid(req);

  if (!isVaildToken) {
    return res.sendStatus(401)
  }

  try {
    res.clearCookie('authorization', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
};
