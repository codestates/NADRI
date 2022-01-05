const { chkValid } = require("../tokenFunctions");
const { user_post_likes, posts } = require("../../models");

module.exports = {
  getLike: async (req, res) => {
    // 인증정보 있는지 확인
    if (!req.cookies["authorization"])
      return res.status(400).json({ message: "Invalid Token" });

    // 인증정보가 검증되는지 확인
    const userData = chkValid(req);
    if (!userData) return res.status(400).json({ message: "Invalid Token" });
    console.log(userData);

    try {
      const userLike = await user_post_likes.findAll({
        where: { userId: userData.id },
      });
      res.status(200).json({ data: userLike });
    } catch (err) {
      res.sendStatus(500);
    }
  },

  postLike: async (req, res) => {
    // 인증정보 있는지 확인
    if (!req.cookies["authorization"])
      return res.status(400).json({ message: "Invalid Token" });

    // 인증정보가 검증되는지 확인
    const userData = chkValid(req);
    if (!userData) return res.status(400).json({ message: "Invalid Token" });
    console.log(userData);

    // 파라미터로 받은 postId가 존재하는지 확인
    console.log(req.params.id);
    if (!req.params.id)
      return res.status(400).json({ message: "Bad Request1" });

    // posts에 받은 post가 존재하는지 확인
    const check = await posts.findeOne({where: {id: req.params.id}})
    if (!check) return res.status(400).json({message: 'Bad Request'})

    // findOne해서 있으면 제거 없으면 생성해야 함
    const like = await user_post_likes.findOne({where: {postId: req.params.id}})

    if (like) {
      await like.destroy()
      return res.sendStatus(200)
    } else {
      await user_post_likes.create({
        userId: userData.id,
        postId: req.parmas.id,
      })
      return res.sendStatus(201)
    }
  },
};
