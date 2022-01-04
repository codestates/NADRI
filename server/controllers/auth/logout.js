const { chkValid } = require("../tokenFunctions");

module.exports = (req, res) => {
  const isVaildToken = chkValid(req);
  console.log(isVaildToken)
  if (!isVaildToken) {
    return res.sendStatus(401)
  }

  try {
    res.clearCookie('authorization', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.status(200).send({message: 'Logout successful'})
  } catch (error) {
    res.sendStatus(500)
  }
};
