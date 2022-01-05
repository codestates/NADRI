const { chkValid } = require('../tokenFunctions');
const { comments, posts } = require('../../models');

module.exports = {
  getUserComment: async (req, res) => {
    // 인증정보 있는지 확인
    if (!req.cookies["authorization"])
      return res.status(401).json({ message: "Invalid Token" });

    // 인증정보가 검증되는지 확인
    const userData = chkValid(req);
    if (!userData) return res.status(401).json({ message: "Invalid Token" });
    console.log(userData);

    // DB에서 userId로 필터한 코멘트 찾아 보내기
    try {
      const find = await comments.findAll({where: {userId: userData.id}})
      res.status(200).json({data: find})
    } catch (err) {
      res.sendStatus(500)
    }
  },

  getPostComment: async (req, res) => {

    // DB 에 찾는 post가 존재하는지 확인
    if (!req.params.id) return res.status(400).json({ message: "Bad Request" });
    const find = await posts.findOne({ where: { id: req.params.id } });
    if (!find) return res.status(400).json({ message: "Bad Request" });

    // DB에서 postId로 필터한 코멘트 찾아 보내기
    try {
      const search = await comments.findAll({where: {postId: req.params.id}})
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
    console.log(userData);

    // DB 에 찾는 post가 존재하는지 확인
    if (!req.params.id) return res.status(400).json({ message: "Bad Request" });
    const find = await posts.findOne({ where: { id: req.params.id } });
    if (!find) return res.status(400).json({ message: "Bad Request" });

    try { 
      // DB에 정보 저장하기
      const create = await comments.create({
        userId: userData.id,
        postId: req.params.id,
        comment: req.body.comment,
      });

      console.log(create)
      
      return res.status(201).json({data: create.dataValues, message: 'new column created'})
    } catch (err) {
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

    // 가져온 comment의 작성자 여부 확인
    if (userData.id !== find.userId) return res.status(400).json({ message: "Bad Request3" });

    try {
      // 심각: findOne 인데도 userId postId 같으면 전부 변경됨. 아니...
      // 기본적으로 찾아오는 기준이 id인데 왜 바뀌지?
      // await find.update({comment: req.body.comment})
      // await find.save()

      // #2 tabel에서 update해주기 > find로 처리하지말고 테이블에서 where로 바로 찾아서 바꿔주는게 맞다
      await comments.update({comment: req.body.comment}, {
        where: {id: req.params.id}
      })

      res.sendStatus(200)
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



    try {
      const find = await comments.findOne({ where: { id: req.params.id } });
      if (!find) res.status(400).json({ message: "Bad Request2" });

      // 가져온 comment의 작성자 여부 확인
      if (userData.id !== find.userId)
        return res.status(400).json({ message: "Bad Request3" });

      // await find.destroy();
      // 여기도 modify와 마찬가지로 테이블 쿼리를 사용해 바로 삭제하기
      await comments.destroy({
        where: {id: req.params.id}
      })

      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500)
    }
  }
}