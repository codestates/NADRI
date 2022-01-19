import {React, useEffect} from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { loginModal, signupModal, authState, gLogIn, kLogIn, userInfo } from '../redux/actions';
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUserPlus, faSignInAlt, faSignOutAlt, faUserCircle, faFile} from '@fortawesome/free-solid-svg-icons'

axios.defaults.withCredentials = true;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 9vw;
  width: 100vw;
  height: 6rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 0px;
  position: sticky;
  top: 0;
  z-index: 998;
  background: #fdfdff;
  padding-top: 2rem;
  padding-bottom: 0.5rem;
  top: -1rem;
  /* font-family: 'Cafe24', arial; */
`

const Logo = styled.div`
  width: 20rem;
  margin: 0;
  align-items: center;
  justify-content: center;
  > a {
    width: 100%;
    height: auto;
  }

  .pcImg {
    display: block;
    width: 250px;
    height: auto;
    flex-shrink: 0;
  }

  .mobileImg {
    display: none;
  }

  @media screen and (max-width:650px){
    .pcImg {
      display: none;
    }
    .mobileImg {
      display: block;
      width: 40px;
      height: auto;
    }
  }
`

const Search = styled.div`
  width: 30rem;
  position: relative;
  margin: 1rem 1rem 1rem 1rem;
  font-family: 'NanumSquare', arial;

  > .searchBar {
    width: 100%;
    height: 40px;
    padding-left: 20px;
    border: 0px solid rgb(95, 99, 104);
    border-radius: 25px;
    box-shadow: 2px 2px 2px 1px rgba(180, 180, 180);
    background: rgb(255,255,255);
    font-family: 'NanumSquare', arial;

  }
  > .searchBar:focus {
    outline: 2px solid rgba(170,170,170);
  }

  > .searchLogo {
    height: 40px;
    position: absolute;
    top: 20%;
    right: 3%;
  }

  @media screen and (max-width:500px) {
    .searchBar {
      width: 150px;
    }
  }
`

const HeaderContent = styled.div`
  width: 20rem;
  display: flex;
  justify-content: center;
  font-size: 1.2rem;

  a {
    color: black;
  }

  button {
    width: 5rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0px solid black;
    border-radius: 5px;
    margin-right: 30px;
    font-size: 1rem;
    box-shadow: 2px 2px 2px 1px rgba(180, 180, 180);
    background: rgb(255,255,255);
    transition: all 0.2s;
    font-family: 'NanumSquare', arial;

    &:hover {
      transition: all 0.2s;
      cursor: pointer;
      transform: scale(1.1);
      color: #ff7400;
      // box-shadow: 
      // inset 3px 3px 3px 0px rgba(200, 200, 200, 0.2), 
      // 2px 2px 2px 0px rgba(0, 0, 0, 0.1),
      // 2px 2px 2px 0px rgba(0, 0, 0, 0.1);
    }

    &:active {
      box-shadow: 2px 2px 0 rgb(0, 0, 0, 0.3);
      position: relative;
      top: 2px;
    }
  }

  &>:last-child {
    margin-right: 0;
  }

  .loginIcon {
    width:70%;
    height: auto;
  }
  .mypageIcon {
    width:85%;
    height: auto;
  }
  .logoutIcon {
    width:85%;
    height: auto;
  }
  .signinIcon {
    width:80%;
    height: auto;
  }
  .postIcon {
    width:65%;
    height: auto;
  }
  span {
    font-size: 8px;
    display: none;
    position: relative;
    margin-left:0.1rem;
    padding-top:1rem;
    
    .iconBox{
      display: block;
      margin: auto;
      width: 38px;
      height: 38px;
      justify-content: center;
      align-items: center;
      padding: 0px auto;
      color: #786b6f;
    }
    .iconText{
      color: #786b6f;
      text-align: center;     
    }
  }

  @media screen and (max-width:900px) {
    button {
      display: none;
    }
    /* .mobileIcon{
      display: inline;
    } */
    /* .postIcon {
      display: flex;
    } */
    /* .mypageIcon {
      display: flex;
    } */
    /* .logoutIcon {
      display: flex;
    } */
    /* .loginIcon {
      display: flex;
    }
    .signinIcon {
      display: flex;
    } */
    span {
      display: inline-block;
    }
  } 
`



export default function Header () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const LoginModalState = useSelector(state => state.loginReducer);
  const SignupModalState = useSelector(state => state.signupReducer);
  const curAuthState = useSelector(state => state.changeAuthState);
  const gLoginState = useSelector(state => state.gLoginReducer);
  const kLoginState = useSelector(state => state.kLoginReducer)
  // console.log('현재 로그인 상태: '+curAuthState)

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/auth/me`)
    .then(result => {
      if (result.status === 200) {
        const {id, email, nickname, image, admin, oauth, createdAt } = result.data.data
        dispatch(authState(curAuthState))
        dispatch(userInfo({id, email, nickname, image, admin, oauth, createdAt }))
      }
    })
    .catch(err => {
      // console.log(err)
      return null
    })
  }, [])

  function ModalHandler (e) {
    // console.dir(e.currentTarget.classList[2])
    if (e.target.textContent === 'Log In' || e.currentTarget.classList[2] === 'loginIcon') {
      dispatch(loginModal(LoginModalState))
    }
    else if (e.target.textContent ==='회원가입' || e.currentTarget.classList[2] === 'signinIcon') {
      dispatch(signupModal(SignupModalState))
    }
  }

  function logout () {
    axios.post(
      `${process.env.REACT_APP_API_URL}/auth/logout`,
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    )
    .then((res) => {
      dispatch(authState(curAuthState))
      // console.log(curAuthState)
      if(gLoginState===true){
        dispatch(gLogIn(gLoginState))
      }
      if(kLoginState===true){
        dispatch(kLogIn(kLoginState))
      }
      navigate('/')
    })
  }
  
  return (
    <StyledHeader>
      <Logo>
        <Link to="/">
          <img className="pcImg" src="/img/nadri-footer-img.png" alt="logo" />
          <img className="mobileImg" src="/img/nadri-logo-small.png" alt="mLogo" />
        </Link>
      </Logo>
      <Search>
        <input className='searchBar' type={'text'} />
        <div className='searchLogo'>
          <input type={'image'} src='/img/search.jpg'/>
        </div>
      </Search>
        {
          curAuthState ?
          <HeaderContent>
          <Link to ='/post'>
            <button>새글 쓰기</button>
            <span className="moblieIcon">
              <div className="iconBox">
                <FontAwesomeIcon icon={faFile} className="postIcon" alt="post" />
              </div>
              <div className="iconText">
              새글&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            </span>
          </Link>
          <Link to ='/mypage'>
            <button>My Page</button>
            <span className="moblieIcon">
              <div className="iconBox">
                <FontAwesomeIcon icon={faUserCircle} className="mypageIcon" alt="my page" />
              </div>
              <div className="iconText">
              my&nbsp;&nbsp;
              </div>
            </span>
          </Link>
          <button onClick={logout}>Log Out</button>
          <span className="moblieIcon">
              <div className="iconBox">
                <FontAwesomeIcon icon={faSignOutAlt} onClick={logout} className="logoutIcon" alt="logout"/>
              </div>
              <div className="iconText">
              Logout
              </div>
          </span>
          </HeaderContent>
          :
          <HeaderContent>
          <button onClick={(e)=>ModalHandler(e)}>
            Log In
          </button>
          <button onClick={(e)=>ModalHandler(e)}>회원가입</button>
          <span className="mobileIcon">
            <div className="iconBox">
              <FontAwesomeIcon icon={faSignInAlt} className="loginIcon" onClick={(e)=>ModalHandler(e)} alt="login" />
            </div>
            <div className="iconText">
            Login&nbsp;&nbsp;
            </div>
          </span>
          <span className="moblieIcon">
            <div className="iconBox">
              <FontAwesomeIcon icon={faUserPlus} className="signinIcon" onClick={(e)=>ModalHandler(e)} alt="signin" />
            </div>
            <div className="iconText">
            회원가입
            </div>
          </span>
          </HeaderContent>
        }
    </StyledHeader>
  )
  
}