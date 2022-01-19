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
    console.log(inputs)
  }

  // 이메일 검증 단계 추가
  const [code, setCode] = useState(null)
  const [userCode, setUserCode] = useState('')
  function sendChkMail (email) {
    if (!email) return alert('이메일을 입력하세요!')
    axios.post(`${process.env.REACT_APP_API_URL}/auth/code`, {email})
    .then(result => {
      setCode(result.data.code)
      alert('인증메일이 발송되었습니다.')
    })
  }
  function verifyCode (userCode) {
    console.log(userCode, code)
    if (!code) return alert('인증 메일을 먼저 발송하세요')

    if (userCode !== code) return alert('일치하지 않습니다!')
    else return alert('인증이 완료되었습니다!')
  }

  function postSignup () {
    const {email, nickname, password, passwordCheck} = inputs
    
    if(password !== passwordCheck) return alert("비밀번호를 확인하세요")
    // if (Object.values(inputs).some((e) => e === '')) return alert("정보를 전부 입력했는지 확인하세요") 이거 다시 작업해야함
    
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/auth/signup`,
      headers: {
        accept: 'application/json'
      },
      data: {password, nickname, email}
    })
    .then((res) => {
      if(res.status === 201) {
        const {id, email, nickname, image, admin, oauth, createdAt} = res.data.data
        dispatch(authState(curAuthState))
        dispatch(userInfo({id, email, nickname, image, admin, oauth, createdAt}))
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
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  const onClickKakao = async () => {
    dispatch(kLogIn(kLoginState))
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/kakao`;
  }

  function handleKeyPress(e) {
    if(e.key === 'Enter') {
      postSignup()
    }
  }

  function handleSendChkMail(e) {
    if(e.key === 'Enter') {
      sendChkMail(inputs.email)
    }
  }

  function handleverifyCode(e) {
    if(e.key === 'Enter') {
      verifyCode(userCode)
    }
  }

  return (
    <ModalBackdrop onClick={ModalHandler}>
      <SignupModalView onClick={(e) => e.stopPropagation()}>

        <ModalHead>
          <span onClick={ModalHandler}>&#x2716;</span>
          <h1>회원가입</h1>
          <p>이미 회원이신가요? &#xa0;<br/><span onClick={(e) => ModalHandler (e)}>로그인하기!</span></p>
        </ModalHead>

        <ModalInput>
          <form>
              <div className="emailInput">
                <label htmlFor="email">이메일</label>
                <div>
                  <input autoComplete="off" onKeyPress={(e) => handleSendChkMail(e)} type={"text"} name="email" onChange={onChange}></input>
                  <button type="button" onClick={() => sendChkMail(inputs.email)} >인증코드</button>
                </div>
                <div>
                  <input autoComplete="off" onKeyPress={(e) => handleverifyCode(e)} type={"password"} placeholder="인증번호를 입력하세요" onChange={(e) => setUserCode(e.target.value)}></input>
                  <button type="button" onClick={() => verifyCode(userCode)}>인증확인</button>
                </div>
              </div>
            <label htmlFor="nickname">닉네임</label>
            <input autoComplete="off" onKeyPress={(e) => handleKeyPress(e)} type={"text"} name="nickname" onChange={onChange}></input>
            <label htmlFor="password">비밀번호</label>
            <input autoComplete="off" onKeyPress={(e) => handleKeyPress(e)} type={"password"} name="password" onChange={onChange}></input>
            <label htmlFor="password">비밀번호 확인</label>
            <input autoComplete="off" onKeyPress={(e) => handleKeyPress(e)} type={"password"} onChange={onChange} name="passwordCheck"></input>
          </form>
        </ModalInput>

        <Oauth>
          <div onClick={postSignup}>
            <div className="normalSignup">회원가입</div>
          </div>
          <span onClick={onClickGoogle}>
            <img className="googlePcLogin" src="/img/btn_google_signin_light_normal_web@2x.png" alt="구글 로그인" />
            <img className="googleMobile" src="/img/btn_google_light_normal_ios.svg" alt="구글m" />
          </span>
          <span onClick={onClickKakao}>
            <img className="kakaoPcLogin" src="/img/kakao_login_medium_narrow.png" alt="카카오 로그인" />
            <img className="kakaoMobile" src="/img/kakaolink_btn_small.png" alt="카카오m"/>
          </span>
        </Oauth>
      </SignupModalView>
    </ModalBackdrop>
  )
}