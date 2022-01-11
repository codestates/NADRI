import './App.css'
import Header from './components/Header';
import Body from './components/Body'
import Footer from './components/Footer';
import Login from './components/Modals/LoginModal/Login'
import Signup from './components/Modals/SignupModal/Signup'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { authState } from './redux/actions'
import { useNavigate } from "react-router-dom";
// axios.defaults.withCredentials = true;


function App() {
  const LoginModalstate = useSelector(state => state.loginReducer);
  const SignupModalstate = useSelector(state => state.signupReducer);
  const curAuthState = useSelector(state => state.changeAuthState);
  const curUserInfo = useSelector(state => state.getUserInfo);
  const store = useSelector(state => state)
  // console.log(store)
  // console.log('app.js의 시작 로그인 상태 :'+curAuthState)

  const gLoginState = useSelector(state => state.gLoginReducer)
  const kLoginState = useSelector(state => state.kLoginReducer)
  const loginState = useSelector(state => state.loginReducer)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 소셜 로그인을 위한 코드(일부 추후 수정 작업 필요)
  const url = new URL(window.location.href)
  // console.log(url)
  const [authorizationCode, setAuthorizationCode] =useState(url.searchParams.get('code'))
  const [accessToken, setAccessToken] = useState(null)

  // useEffect(() => { 새로고침 스크롤 TOP
  //   window.onbeforeunload = function pushRefresh() {
  //     window.scrollTo(0, 0);
  //   };
  // }, []);

  // Oauth 로그인을 위한 useEffect
  useEffect(() => {
    if(authorizationCode){
      // console.log(authorizationCode)
      // console.log('구글 로그인 클릭 상태: '+gLoginState)
      // console.log('카카오 로그인 클릭 상태: '+kLoginState)

      if(gLoginState===true){
        getGoogleAccessToken(authorizationCode)
      }
      if(kLoginState===true){
        getKakaoAccessToken(authorizationCode)
      }
    }
  }, [])


  const getGoogleAccessToken = async (authorizationCode) => {
    //! 서버의 해당 엔드포인트로 authorization code를 보내주고 access token을 받아옴
    await axios
    .post(`${process.env.REACT_APP_API_URL}/auth/googleCallback`, { // 서버 배포시 url 수정 필요(환경 변수)
      authorizationCode
    })
    .then((result) => {
      // console.dir(result)
      setAccessToken(result.data.accessToken)
      dispatch(authState(curAuthState))
      // console.log(curAuthState)
      navigate('/')

    })
    .catch((err) => {
      console.log('구글 get액세스토큰 catch Err')
    })
  }

  const getKakaoAccessToken = async (authorizationCode) => {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/kakaoCallback`, {
      authorizationCode
    })
    .then((result) =>{
      // console.dir(result)
      setAccessToken(result.data.accessToken)
      dispatch(authState(curAuthState))
      // console.log(curAuthState)
      navigate('/')
    })
    .catch((err) => {
      console.log('카카오 get액세스토큰 catch Err')
    })
  }

  // console.log('구글 로그인 클릭 상태: '+gLoginState)

  return (
    <div className="App">
      <Header />
      <Body />
      <Footer />
      {
        LoginModalstate ? <Login />
        : ''
      }
      {
        SignupModalstate ? <Signup />
        : ''
      }
    </div>
  );
}

export default App;
