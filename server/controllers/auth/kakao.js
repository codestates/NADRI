require('dotenv').config()
const { users } = require('../../models')
const clientID = process.env.KAKAO_CLIENT_ID
const clientSecret = process.env.KAKAO_CLIENT_SECRET
const redirectUri = process.env.CLIENT_URI
const axios = require('axios')
const { mkAccessToken, sendAccessToken, encryptPW } = require('../tokenFunctions')
// qs 써야함
const qs = require('qs')

module.exports = {
    kakaoLogin: async (req, res) => {
        console.log('===kakaoLogin 메서드 통과===')
        return res.redirect(
            // 카카오 로그인 화면 리디렉션
            `https://kauth.kakao.com/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=code`
        )
    },

    kakaoCallback: async (req, res) => {
        console.dir(req.body)
        const getKtoken = await axios({
            method: 'post',
            url: 'https://kauth.kakao.com/oauth/token',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            // qs.stringfy 해줘야 함. kakao의 경우 쿼리스트링 으로 조립 작업이 필요하다
            // 없으면 data 부분에서 'Bad client credentials' 에러 뜸
            // 분해된 query 객체를 문자열로 다시 조립하는 과정(stringfy)
            // urlrecoded 방식으로 데이터를 보내기 위해서는 string 형태로 변환하는 작업이 필요하다.
            data: qs.stringify ({  
                grant_type: 'authorization_code',
                client_id: clientID,
                 client_secret: clientSecret,
                redirect_uri: redirectUri,
                code: req.body.authorizationCode
            })
        })

        console.log(getKtoken)
        console.log('=== getKtoken : post 요청 구간 통과 ===')

        const kakaoUserInfo = await axios({
            method: 'get',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
                authorization: `Bearer ${getKtoken.data.access_token}`,

            },
        })
        console.dir(kakaoUserInfo)
        console.dir(kakaoUserInfo.data.kakao_account.profile)
        console.log('=== kakaoUserInfo: get 요청 구간 통과 ===')

        await users.findOrCreate({
            where: { email: kakaoUserInfo.data.kakao_account.email },
            defaults: {
                email: kakaoUserInfo.data.kakao_account.email,
                password: encryptPW(String(kakaoUserInfo.data.id)),
                nickname: kakaoUserInfo.data.kakao_account.profile.nickname,
                image: kakaoUserInfo.data.kakao_account.profile.profile_image_url,
                admin: false,
                oauth: true,
            },
        })
        .then(([result, created]) => {
            //find하든지, create하든지 상관없이 가져오면 됨
            const payLoad = result.dataValues;
            delete payLoad.password
            console.log(payLoad)
            const aToken = mkAccessToken(payLoad)
            console.log(aToken)
            console.log('=====kakao result 구간 통과=====')
            sendAccessToken(res, aToken)
            res.status(200).json({ data: payLoad })
        })
        .catch((err) => {
            console.log('kakao catch err 입니다')
            res.sendStatus(500)
        })
    }



}