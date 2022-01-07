import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ModalBackdrop,
  SignupModalView,
  ModalLogo,
  ModalHead,
  ModalInput,
  Oauth
} from "../SignupModal/SignupStyled"
import {connectAdvanced, useDispatch, useSelector} from 'react-redux'
import { signupModal, loginModal, authState, userInfo, gLogIn, kLogIn} from '../../../redux/actions';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Signup () {
  const navigate = useNavigate()
  const [inputs, setIntputs] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordCheck: ''
  })

  const dispatch = useDispatch()
  const LoginModalstate = useSelector(state => state.loginReducer);
  const SignupModalstate = useSelector(state => state.signupReducer);
  const curAuthState = useSelector(state => state.changeAuthState);
  // const curUserInfo = useSelector(state => state.getUserInfo);
  const gLoginState = useSelector(state => state.gLoginReducer);
  const kLoginState = useSelector(state => state.kLoginReducer);

  function onChange (e) {
    const {name, value} = e.target
    setIntputs({
      ...inputs,
      [name]: value
    })
  }

  function postSignup () {
    const {email, nickname, password, passwordCheck} = inputs
    
    if(password !== passwordCheck) return alert("비밀번호를 확인하세요")
    // if (Object.values(inputs).some((e) => e === '')) return alert("정보를 전부 입력했는지 확인하세요") 이거 다시 작업해야함
    
    axios({
      method: 'POST',
      url: `https://localhost:8443/auth/signup`,
      headers: {
        accept: 'application/json'
      },
      data: {password, nickname, email}
    })
    .then((res) => {
      if(res.status === 201) {
        const {email, nickname, createdAt} = res.data.data
        dispatch(authState(curAuthState))
        dispatch(userInfo({email, nickname, createdAt}))
        dispatch(signupModal(SignupModalstate))
        alert('회원가입이 완료되었습니다.')
        navigate('/')
      }
    })
    .catch(err => {
      console.log(err)
      return alert('오류 발생: 이미 가입하셨는지 확인하세요')
    })
  }
  
  function ModalHandler (e) {
    if(e.target.textContent === '로그인하기!') {
      dispatch(signupModal(SignupModalstate))
      dispatch(loginModal(LoginModalstate))
      return;
    }
    dispatch(signupModal(SignupModalstate))
  }

  const onClickGoogle = async () => {
    dispatch(gLogIn(gLoginState))
    window.location.href = 'https://localhost:8443/auth/google';
  };

  const onClickKakao = async () => {
    dispatch(kLogIn(kLoginState))
    window.location.href = 'https://localhost:8443/auth/kakao';
  }

  return (
    <ModalBackdrop onClick={ModalHandler}>
      <SignupModalView onClick={(e) => e.stopPropagation()}>

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
                  <input autocomplete="off" type={"text"} name="email" onChange={onChange}></input>
                  <button type="button">중복확인</button>
                </div>
                <div>
                  <input autocomplete="off" type={"password"} placeholder="인증번호 이거 나중에 다시 작업해야함"></input>
                  <button type="button">인증확인</button>
                </div>
              </div>
            <label htmlFor="nickname">닉네임</label>
            <input autocomplete="off" type={"text"} name="nickname" onChange={onChange}></input>
            <label htmlFor="password">비밀번호</label>
            <input autocomplete="off" type={"password"} name="password" onChange={onChange}></input>
            <label htmlFor="password">비밀번호 확인</label>
            <input autocomplete="off" type={"password"} onChange={onChange} name="passwordCheck"></input>
          </form>
        </ModalInput>

        <Oauth>
          <div onClick={postSignup}>회원가입</div>
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
      </SignupModalView>
    </ModalBackdrop>
  )
}