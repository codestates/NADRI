import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { loginModal, signupModal, authState } from '../redux/actions';

import axios from 'axios'

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 9vw;
  width: 100vw;
  height: 6rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 0px;
`

const Logo = styled.div`
  width: 20rem;
  margin: 0;
  > a {
    width: 20rem;
    height: auto;
  }

  > a img {
    display: block;
    width: 100%;
    height: auto;
  }
`

const Search = styled.div`
  width: 30rem;
  position: relative;
  margin: 0 auto;
  > .searchBar {
    width: 100%;
    height: 40px;
    padding-left: 20px;
    border: 1px solid rgb(95, 99, 104);
    border-radius: 25px;
  }

  > .searchLogo {
    height: 40px;
    position: absolute;
    top: 20%;
    right: 3%;
  }
`

const HeaderContent = styled.div`
  width: 20rem;
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
  div {
    width: 5rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 5px;
    margin-right: 30px;
    font-size: 1rem;

    &:hover {
      cursor: pointer;
    }
  }

  &>:last-child {
    margin-right: 0;
  }
`

export default function Header () {
  const dispatch = useDispatch()

  const LoginModalState = useSelector(state => state.loginReducer);
  const SignupModalState = useSelector(state => state.signupReducer);
  const authState = useSelector(state => state.changeAuthState);
  console.log(authState)

  function ModalHandler (e) {
    if (e.target.textContent === '로그인') {
      dispatch(loginModal(LoginModalState))
    }
    else if (e.target.textContent ==='회원가입') {
      dispatch(signupModal(SignupModalState))
    }
  }

  function logout () {
    axios({
      method: 'POST',
      url: `https://localhost:8443/auth/logout`
    })
    .then((res) => {
      dispatch(authState(authState))
      console.log(res)
    })
  }
  
  return (
    <StyledHeader>
      <Logo>
        <Link to="/">
          <img src="NADRI.png" alt="logo" />
        </Link>
      </Logo>
      <Search>
        <input className='searchBar' type={'text'} />
        <div className='searchLogo'>
          <input type={'image'} src='search.jpg'/>
        </div>
      </Search>
        {
          authState ?
          <HeaderContent>
          <div onClick={(e)=>ModalHandler(e)}>새글 쓰기</div>
          <div onClick={(e)=>ModalHandler(e)}>마이페이지</div>
          <div onClick={logout}>로그아웃</div>
          </HeaderContent>
          :
          <HeaderContent>
          <div onClick={(e)=>ModalHandler(e)}>로그인</div>
          <div onClick={(e)=>ModalHandler(e)}>회원가입</div>
          </HeaderContent>
        }
    </StyledHeader>
  )
  
}