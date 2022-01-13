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
      const {nickname, createdAt, emai, image} = res.data.data
      if(res.status = 200) {
        dispatch(authState(curAuthState))
        dispatch(userInfo({email, nickname, createdAt, image}))
        dispatch(loginModal(LoginModalstate))
        alert('로그인이 완료되었습니다.')
        navigate('/')
      }
    })
    .catch((err) => {
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
  


  return (
    <ModalBackdrop onClick={ModalHandler}>
      <LoginModalView onClick={(e) => e.stopPropagation()}>

        <ModalLogo>
          <div><img src="/NADRI.png" /></div>
        </ModalLogo>

        <ModalHead>
          <span onClick={ModalHandler}>&#x2716;</span>
          <h1>로그인</h1>
          <p>회원이 아니신가요? &#xa0;<span onClick={(e) => ModalHandler(e)}>회원가입하기!</span></p>
        </ModalHead>

        <ModalInput>
          <form>
            <label htmlFor="email">이메일</label>
            <input autoComplete="off" type={"text"} name="email" onChange={onChange}></input>
            <label htmlFor="password">비밀번호</label>
            <input autoComplete="off" type={"password"} name="password" onChange={onChange}></input>
          </form>
        </ModalInput>

        <Oauth>
          <div onClick={postLogin}>로그인</div>
          <div>
            <button onClick={onClickGoogle}>
            <img src="google.png" alt="구글 로그인" />구글 로그인
            </button>
          </div>
          <div>
            <button onClick={onClickKakao}>
            <img src="kakao.png" />카카오톡 로그인
            </button>
          </div>
        </Oauth>
      </LoginModalView>
    </ModalBackdrop>
  )
}