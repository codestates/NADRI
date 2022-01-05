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
import { loginModal, signupModal,authState } from '../../../redux/actions';
import axios from "axios";

export default function Login () {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })

  const dispatch = useDispatch()
  const LoginModalstate = useSelector(state => state.loginReducer);
  const SignupModalstate = useSelector(state => state.signupReducer);
  const curAuthState = useSelector(state => state.changeAuthState);
  const userInfo = useSelector(state => state.getUserInfo);

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
      url: 'https://localhost:8443/auth/login',
      headers: {
        accept: 'application/json'
      },
      data: {email, password}
    })
    .then((res) => {
      if(res.status = 200) {
        dispatch(authState(curAuthState))
        dispatch(loginModal(LoginModalstate))
      }
    })
  }

  function ModalHandler (e) {
    if(e.target.textContent === '회원가입하기!') {
      dispatch(loginModal(LoginModalstate))
      dispatch(signupModal(SignupModalstate))
      return;
    }
    dispatch(signupModal(LoginModalstate))
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
            <input type={"text"} name="email" onChange={onChange}></input>
            <label htmlFor="password">비밀번호</label>
            <input type={"password"} name="password" onChange={onChange}></input>
          </form>
        </ModalInput>

        <Oauth>
          <div onClick={postLogin}>로그인</div>
          <div><img src="google.png" />구글 로그인</div>
          <div><img src="kakao.png" />카카오톡 로그인</div>
        </Oauth>
      </LoginModalView>
    </ModalBackdrop>
  )
}