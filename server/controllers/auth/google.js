require('dotenv').config()
const { users } = require('../../models')
const clientID = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const redirectUri = process.env.CLIENT_URI
const axios = require('axios')
const { mkAccessToken, sendAccessToken } = require('../tokenFunctions')
const qs = require('qs')

module.exports = {

    googleLogin: async (req, res) => {
        console.log('googleLogin 구간 통과')
        return res.redirect(
            // 구글 로그인 화면 리디렉션
            `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientID}&response_type=code&redirect_uri=${redirectUri}&scope=openid%20email%20profile`
        )
    },

    googleCallback: async (req, res) => {
        // console.dir(req.body)
        const getGtoken = await axios({
            method: 'post',
            url: 'https://oauth2.googleapis.com/token',
            headers: {
                // accept: 'application/json',
                'content-type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify ({
                client_id: clientID,
                client_secret: clientSecret,
                code: req.body.authorizationCode,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            })
        })
        // console.log(getGtoken)
        console.log('=== getGtoken : post 요청 구간 통과 ===')
        const googleUserInfo = await axios({
            method: 'get',
            url: 'https://www.googleapis.com/oauth2/v2/userinfo?access_token='+getGtoken.data.access_token,
            headers: {
                authorization: `token ${getGtoken.data.access_token}`,
                accept: 'application/json',
            },
        })
        console.log('=== googleUserInfo: get 요청 구간 통과 ===')

        await users.findOrCreate({
            where: { email: googleUserInfo.data.email },
            defaults: {
                email: googleUserInfo.data.email,
                password: googleUserInfo.data.id,
                nickname: googleUserInfo.data.name,
                image: '',
                admin: false,
                oauth: true,
            },
        })
        .then(([result, created]) => {
            //find하든지, create하든지 상관없이 가져오면 됨
            const payLoad = result.dataValues;
            delete payLoad.password
            // console.log(payLoad)
            const aToken = mkAccessToken(payLoad)
            // console.log(aToken)
            console.log('google result 구간 통과')
            sendAccessToken(res, aToken)
            // console.dir(res)
            res.sendStatus(200)
            // ! 이 놈이 문제였음   // preflight cors 에러뜸
            // res.redirect(process.env.CLIENT_URI) 

        })
        .catch((err) => {
            console.log('google catch err 입니다')
            res.sendStatus(500)
        })
        // res.send("일단 ok")
    },
}
