const { chkValid } = require("../tokenFunctions");
const { user_post_likes, posts, sequelize } = require("../../models");
const { QueryTypes } = require("sequelize");

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
      const userLike = await sequelize.query(`
        SELECT user_post_likes.postId, posts.title, posts.image, posts.content, posts.address, DATE_FORMAT(posts.createdAt,'%Y-%m-%d') AS createdAt
        FROM user_post_likes JOIN posts ON user_post_likes.postId = posts.id
        WHERE user_post_likes.userId = ${userData.id}
      `, { type: QueryTypes.SELECT })

      userLike[0].map(e => {
        e.image = process.env.AWS_CLOUD_URL + e.image.split(',')[0]
      })
      
      res.status(200).json({ data: userLike[0] });
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
    console.log('id', req.params.id);
    if (!req.params.id)
      return res.status(400).json({ message: "Bad Request" });

    // posts에 받은 post가 존재하는지 확인
    const check = await posts.findOne({where: {id: req.params.id}})
    if (!check) return res.status(400).json({message: 'Bad Request'})

    try{
      // findOne해서 있으면 제거 없으면 생성해야 함
      const like = await user_post_likes.findOne({where: {postId: req.params.id, userId: userData.id}})

      if (like) {
        await like.destroy()
        return res.sendStatus(200)
      } else {
        await user_post_likes.create({
          userId: userData.id,
          postId: req.params.id,
        })
        return res.sendStatus(201)
      }
    } catch(err) {
      res.sendStatus(500)
    }
  },
};
