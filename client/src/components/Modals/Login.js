import React from "react"
import { Link } from "react-router-dom"
import {
  LoginModalContainer,
  LoginModalBackdrop,
  LoginModalView,
  LoginModalLogo,
  ModalHead,
  ModalInput,
  Oauth
} from "./ModalStyles"
import {useDispatch, useSelector} from 'react-redux'
import { loginModal } from '../../redux/actions';

export default function Login () {
  const dispatch = useDispatch()
  const LoginModalstate = useSelector(state => state.loginReducer.state);

  function openLoginModal () {
    dispatch(loginModal(LoginModalstate))
  }

  return (
    <LoginModalBackdrop onClick={openLoginModal}>
      <LoginModalView onClick={(e) => e.stopPropagation()}>

        <LoginModalLogo>
          <div><img src="/NADRI.png" /></div>
        </LoginModalLogo>

        <ModalHead>
          <span onClick={openLoginModal}>&#x2716;</span>
          <h1>로그인</h1>
          <p>회원이 아니신가요? &#xa0;<span>회원가입하기!</span></p>
        </ModalHead>

        <ModalInput>
          <form>
            <label htmlFor="email">이메일</label>
            <input type={"text"}></input>
            <label htmlFor="password">비밀번호</label>
            <input type={"password"}></input>
          </form>
        </ModalInput>

        <Oauth>
          <div>로그인</div>
          <div><img src="google.png" />구글 로그인</div>
          <div><img src="kakao.png" />카카오톡 로그인</div>
        </Oauth>
      </LoginModalView>
    </LoginModalBackdrop>
  )
}