const { chkValid } = require("../tokenFunctions");

module.exports = (req, res) => {
  const isVaildToken = chkValid(req);

  if (!isVaildToken) {
    return res.status(401).send({ message: "Unauthorized Request" });
  }

  try {
    res.clearCookie('authorization', {
      secure: true,
      sameSite: none,
    });
    res.status(200).send({ message: "ok" });
  } catch (error) {
    res.status(500).send({ message: "Internel Server Error" });
  }
};
