import React, { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ModalBackdrop,
  LoginModalBackdrop,
  LoginModalView,
  ModalLogo,
  ModalHead,
  ModalInput,
  Oauth
} from "./LoginStyled"
import {useDispatch, useSelector} from 'react-redux'
import { loginModal, signupModal, authState, gLogIn, kLogIn, userInfo } from '../../../redux/actions';
import { useNavigate } from "react-router-dom";

import axios from 'axios'
axios.defaults.withCredentials = true;

export default function Login () {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const LoginModalstate = useSelector(state => state.loginReducer);
  const SignupModalstate = useSelector(state => state.signupReducer);
  const curAuthState = useSelector(state => state.changeAuthState);
  const curUserInfo = useSelector(state => state.getUserInfo);
  const gLoginState = useSelector(state => state.gLoginReducer);
  const kLoginState = useSelector(state => state.kLoginReducer);

  function onChange (e) {
    const {name, value} = e.target

    setInputs({
      ...inputs,
      [name]: value
    })
  }

  function postLogin () {
    const {email, password} = inputs
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/auth/login`,
      headers: {
        accept: 'application/json'
      },
      data: {email, password}
    })
    .then((res) => {
      // console.log(res.data.data)
      const {nickname, createdAt, email, image, oauth} = res.data.data
      if(res.status = 200) {
        dispatch(authState(curAuthState))
        dispatch(userInfo({email, nickname, createdAt, image, oauth}))
        dispatch(loginModal(LoginModalstate))
        alert('로그인이 완료되었습니다.')
        navigate('/')
      }
    })
    .catch((err) => {
      // if(err.status = 400){
      //   alert('틀렸습니다')
      // }
      alert('잘못된 로그인입니다.')
      console.log(err)
    })
  }

  function ModalHandler (e) {
    if(e.target.textContent === '회원가입하기!') {
      dispatch(loginModal(LoginModalstate))
      dispatch(signupModal(SignupModalstate))
      return;
    }
    dispatch(loginModal(LoginModalstate))
  }

  const onClickGoogle = async () => {
    // console.log(e)
    dispatch(gLogIn(gLoginState))
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
    // window.location.href = '/';
  };

  const onClickKakao = async () => {
    dispatch(kLogIn(kLoginState))
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/kakao`;
  }
  

  function handleKeyPress(e) {
    if(e.key === 'Enter') {
      postLogin()
    }
  }

  return (
    <ModalBackdrop onClick={ModalHandler}>
      <LoginModalView onClick={(e) => e.stopPropagation()}>

        <ModalLogo>
          <div>
            <img className="mainLogo" src="/img/nadri-footer-img.png" alt="메인 로고"/>
            <img className="mobileLogo" src="/img/nadri-logo-small.png" alt="모바일 로고" />
          </div>
        </ModalLogo>

        <ModalHead>
          <span onClick={ModalHandler}>&#x2716;</span>
          <h1>로그인</h1>
          <p>회원이 아니신가요? &#xa0;<br/><span onClick={(e) => ModalHandler(e)}>회원가입하기!</span></p>
        </ModalHead>

        <ModalInput>
          <form>
            <label htmlFor="email">이메일</label>
            <input autoComplete="off" type={"text"} name="email" onKeyPress={(e) => handleKeyPress(e)} onChange={onChange}></input>
            <label htmlFor="password">비밀번호</label>
            <input autoComplete="off" type={"password"} name="password" onKeyPress={(e) => handleKeyPress(e)} onChange={onChange}></input>
          </form>
        </ModalInput>

        <Oauth>
          <div onClick={postLogin}>
            <div className="normalLogin">로그인</div>
          </div>
          <span onClick={onClickGoogle}>
            {/* <button onClick={onClickGoogle}> */}
            <img className="googlePcLogin" src="/img/btn_google_signin_light_normal_web@2x.png" alt="구글 로그인" />
            <img className="googleMobile" src="/img/btn_google_light_normal_ios.svg" alt="구글m" />
            {/* </button> */}
          </span>
          <span onClick={onClickKakao}>
            {/* <button onClick={onClickKakao}> */}
            <img className="kakaoPcLogin" src="/img/kakao_login_medium_narrow.png" alt="카카오 로그인" />
            <img className="kakaoMobile" src="/img/kakaolink_btn_small.png" alt="카카오m"/>
            {/* </button> */}
          </span>
        </Oauth>
      </LoginModalView>
    </ModalBackdrop>
  )
}