import React from "react"
import { Link } from "react-router-dom"
import {
  ModalBackdrop,
  SignupModalView,
  ModalLogo,
  ModalHead,
  ModalInput,
  Oauth
} from "../SignupModal/SignupStyled"
import {useDispatch, useSelector} from 'react-redux'
import { signupModal, loginModal } from '../../../redux/actions';

export default function Signup () {
  const dispatch = useDispatch()

  const loginState = useSelector(state => state.loginReducer);
  const signupState = useSelector(state => state.signupReducer);
  
  function ModalHandler (e) {
    if(e.target.textContent === '로그인하기!') {
      dispatch(signupModal(signupState))
      dispatch(loginModal(loginState))
      return;
    }
    dispatch(signupModal(signupState))
  }

  return (
    <ModalBackdrop onClick={ModalHandler}>
      <SignupModalView onClick={(e) => e.stopPropagation()}>

        {/* <ModalLogo>
          <div><img src="/NADRI.png" /></div>
        </ModalLogo> */}

        <ModalHead>
          <span onClick={ModalHandler}>&#x2716;</span>
          <h1>회원가입</h1>
          <p>이미 회원이신가요? &#xa0;<span onClick={(e) => ModalHandler (e)}>로그인하기!</span></p>
        </ModalHead>

        <ModalInput>
          <form>
              <div className="emailInput">
                <label htmlFor="email">이메일</label>
                <div>
                  <input type={"text"}></input>
                  <button type="button">중복확인</button>
                </div>
                <div>
                  <input type={"password"} placeholder="인증번호 이거 나중에 다시 작업해야함"></input>
                  <button type="button">중복확인</button>
                </div>
              </div>
            <label htmlFor="nickName">닉네임</label>
            <input type={"text"}></input>
            <label htmlFor="password">비밀번호</label>
            <input type={"password"}></input>
            <label htmlFor="password">비밀번호 확인</label>
            <input type={"password"}></input>
          </form>
        </ModalInput>

        <Oauth>
          <div>회원가입</div>
          <div><img src="google.png" />구글 로그인</div>
          <div><img src="kakao.png" />카카오톡 로그인</div>
        </Oauth>
      </SignupModalView>
    </ModalBackdrop>
  )
}