const { chkValid } = require('../tokenFunctions');
const { comments, posts, sequelize } = require('../../models');
const { QueryTypes } = require("sequelize");

module.exports = {
  getUserComment: async (req, res) => {
    // 인증정보 있는지 확인
    if (!req.cookies["authorization"])
      return res.status(401).json({ message: "Invalid Token" });

    // 인증정보가 검증되는지 확인
    const userData = chkValid(req);
    if (!userData) return res.status(401).json({ message: "Invalid Token" });
    // console.log(userData);

    // DB에서 userId로 필터한 코멘트 찾아 보내기
    try {
      const testQuery = await sequelize.query(`
        SELECT comments.postId, comments.comment, posts.image, posts.title, posts.address, DATE_FORMAT(comments.createdAt,'%Y-%m-%d') AS createdAt
        FROM comments
        JOIN posts ON comments.postId = posts.id
        WHERE comments.userId = ${userData.id} ORDER BY comments.updatedAt DESC
      `)
    
      testQuery[0].map(e => e.image = process.env.AWS_CLOUD_URL + e.image.split(',')[0] )

      console.log('testQuery', testQuery.length)

      res.status(200).json({data: testQuery[0]})
    } catch (err) {
      res.sendStatus(500)
    }
  },

  getPostComment: async (req, res) => {
    // 포스트의 public 값 체크해 인증진행도 추가해야 함
    
    // DB 에 찾는 post가 존재하는지 확인
    if (!req.params.id) return res.status(400).json({ message: "Bad Request" });
    const find = await posts.findOne({ where: { id: req.params.id } });
    if (!find) return res.status(400).json({ message: "Bad Request" });
    
    // public 값 체크해 인증 진행하기
    // 비공개 글이면 JWT를 검증해 유저ID가 게시글 유저ID와 같은지 확인
    
    if (!find.public) {
      const userData = chkValid(req);
      
      if (!userData) return res.status(401).json({ message: "Invalid Token" });
      

      if (userData.id !== find.userId) return res.status(400).json({message: 'Not Authorized'})
    }

    // DB에서 postId로 필터한 코멘트 찾아 보내기
    // Post에서 댓글 보여주는 데 필요한 nickname, userImage를 포함해야 하므로 Join시켜야 함
    try {
      
      const search = await sequelize.query(`
        SELECT comments.id, comments.userId, comments.postId, comments.comment, DATE_FORMAT(comments.createdAt,'%Y.%m.%d') AS createdAt, users.nickname, users.image
        FROM comments JOIN users ON comments.userId = users.id WHERE comments.postId = ${req.params.id}
      `, { type: QueryTypes.SELECT })
      console.log(search)
      search.map(e => e.image = process.env.AWS_CLOUD_URL + e.image.split(',')[0] )

      res.status(200).json({data: search})
    } catch (err) {
      res.sendStatus(500)
    }
  },

  postComment: async (req, res) => {
    // 인증정보 있는지 확인
    if (!req.cookies["authorization"])
      return res.status(400).json({ message: "Invalid Token" });

    // 인증정보가 검증되는지 확인
    const userData = chkValid(req);
    if (!userData)
      return res.status(400).json({ message: "Invalid Token" });
    // console.log(userData);

    // DB 에 찾는 post가 존재하는지 확인
    if (!req.params.id) return res.status(400).json({ message: "Bad Request" });
    const find = await posts.findOne({ where: { id: req.params.id } });
    if (!find) return res.status(400).json({ message: "Bad Request" });

    try { 
      // DB에 정보 저장하기
      const create = await comments.create({
        userId: userData.id,
        postId: Number(req.params.id),
        comment: req.body.comment,
        // image: userData.image
      });
      
      const result = create.dataValues
      result.image = process.env.AWS_CLOUD_URL + userData.image.split(',')[0]
      result.nickname = userData.nickname
      result.createdAt = '방금 전'
      
      return res.status(201).json({data: result, message: 'new column created'})
    } catch (err) {
      console.log(err)
      return res.sendStatus(500)
    }
  },

  modifyComment: async (req, res) => {
    // 인증정보 있는지 확인
    if (!req.cookies["authorization"])
      return res.status(400).json({ message: "Invalid Token" });

    // 인증정보가 검증되는지 확인
    const userData = chkValid(req);
    if (!userData)
      return res.status(400).json({ message: "Invalid Token" });
    console.log(userData);

    // 파라미터로 받은 commentId가 존재하는지 확인
    console.log(req.params.id)
    if (!req.params.id) return res.status(400).json({ message: "Bad Request1" });

    const find = await comments.findOne({where: {id: req.params.id}})
    if (!find) res.status(400).json({ message: "Bad Request2" })

    console.log(find.dataValues)

    try {
      // table에서 update해주기 > 테이블에서 where로 바로 찾아서 바꿔주는게 맞다
      if (userData.admin || userData.id === find.userId) {
        await comments.update({comment: req.body.comment}, {
          where: {id: req.params.id}
        })
        return res.sendStatus(200)
      } else {
        return res.status(400).json({ message: "Bad Request3" });
      }
    } catch (err) {
      res.sendStatus(500)
    }
  },

  deleteComment: async (req, res) => {
    // 인증정보 있는지 확인
    if (!req.cookies["authorization"])
      return res.status(400).json({ message: "Invalid Token" });

    // 인증정보가 검증되는지 확인
    const userData = chkValid(req);
    if (!userData) return res.status(400).json({ message: "Invalid Token" });
    console.log(userData);

    // 파라미터로 받은 commentId가 존재하는지 확인
    console.log(req.params.id);
    if (!req.params.id)
      return res.status(400).json({ message: "Bad Request1" });

    const find = await comments.findOne({ where: { id: req.params.id } });
    if (!find) return res.status(400).json({ message: "Bad Request2" });

    try {
      // modify와 마찬가지로 Admin이거나 유저 본인이면 삭제 OK
      if (userData.admin || userData.id === find.userId) {
        await comments.destroy({
          where: {id: req.params.id}
        })
        return res.sendStatus(200)
      } else {
        return res.status(400).json({ message: "Bad Request3" });
      }
    } catch (err) {
      res.sendStatus(500)
    }
  }
}