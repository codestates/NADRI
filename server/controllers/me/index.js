const { chkValid } = require('../tokenFunctions')
const { users, posts } = require('../../models');
const { rmSync } = require('fs');

module.exports = {
  getUserInform: (req, res) => {
    // 인증정보가 있는지 확인
    if (!req.cookies['authorization']) return res.status(400).json({message: 'Bad Request'})
    // 인증정보가 유효한지 확인
    const userData = chkValid(req)
    if (!userData) res.status(400).json({message: 'Invalid token'})

    // 데이터 반환
    try{
      delete userData.updatedAt
      delete userData.createdAt
      res.status(200).json({data: userData})
    } catch (err) {
      res.sendStatus(500)
    }
  },

  patchUserInform: async (req, res) => {

    // 인증정보가 있는지 확인
    if (!req.cookies['authorization']) return res.status(400).json({message: 'Bad Request'})
    // 인증정보가 유효한지 확인
    const userData = chkValid(req)
    if (!userData) res.status(400).json({message: 'Invalid token'})
    
    try {
      // 인증 완료 > 정보 업데이트
      let path = null
      if (Boolean(req.files)) {
        const image = req.files['profile'];
        if (image[0].location) path = image.map((img) => img.key);
        else path = image.map((img) => img.path)
      }

      const {nickname, password} = req.body

      const find = await users.findOne({ where: { email: userData['email'] } })
      if (nickname) find.nickname = nickname
      if (password) find.password = password
      if (path) {
        let imgStr = "";
        path.map((e) => (imgStr += `${e}`));
        find.image = imgStr
        await find.save()
        return res.send(imgStr)
      }
      await find.save()
      return res.sendStatus(200)
      
    } catch (err) {
      console.log(err)
      return res.sendStatus(500)
    }
  },

  getUserPost: async (req, res) => {

     // 인증정보가 있는지 확인
    if (!req.cookies['authorization']) return res.status(400).json({message: 'Bad Request'})

    // 인증정보가 유효한지 확인
    const userData = chkValid(req)
    if (!userData) res.status(400).json({message: 'Invalid token'})

    try {

      const userPost = await posts.findAll({
        where: {userId: userData.id}
      })

      if(userPost.length ===0){
        return res.status(200).json({data:null, message: '작성한 글이 없어요'})
      }
      // console.log(userPost);
      res.status(200).json({data: userPost})

    } catch (error) {
      console.log('getUserPost 500 err')
      res.sendStatus(500)
    }
  },
}