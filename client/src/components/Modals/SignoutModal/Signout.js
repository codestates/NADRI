import axios from "axios";
import React from "react";
import styled from "styled-components";
import { ModalBackdrop } from "../LoginModal/LoginStyled";
import { useNavigate } from "react-router-dom";
import { authState } from '../../../redux/actions/index'
import {useDispatch, useSelector} from 'react-redux'
import {useState} from 'react'
import SignoutCheckModal from '../SignoutModal/SignoutCheck'

axios.defaults.withCredentials = true;

export const ModalView = styled.div`
  width: 32rem;
  height: 13rem;
  background-color: white;
  /* border: 2px solid black; */
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;

  position: relative;


  span {
    font-size: 1.2rem;
  }

  .buttonContainer {
    display: flex;
    justify-content: center;
    gap: 1rem;

    >button {
      width: 8rem;
      height: 3rem;
      border-radius: 10px;
      border: 0px solid black;
      background-color: #f6d9d5;
      font-size: 1.1rem;
      cursor: pointer;
      font-family: 'NanumSquare', arial;
      box-shadow: 2px 2px 2px 1px rgb(180 180 180);
    }
    >button:active {
      background-color: pink;
      color: white;
    }
  }

  @media (max-width:650px){
    width: 70vw;
    height: 12rem;

    .buttonContainer {
      
      > button {
        width: 6rem;
  
      }
    }
  }
`

export default function SignoutModal({signOutHandler}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const curAuthState = useSelector(state => state.changeAuthState);
  const [signoutCheck, setSignoutCheck] = useState(false)

  function signoutCheckHandler() {
    setSignoutCheck(true)
  }

  function SignoutPost () {
    axios.delete(`${process.env.REACT_APP_API_URL}/auth/signout`)
    .then((res) => {
      signoutCheckHandler()
    })
  }

  return (
    <div>
    <ModalBackdrop onClick={signOutHandler}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <span>정말 회원 탈퇴하시겠습니까?</span>
        <div className="buttonContainer">
          <button type="button" onClick={signOutHandler}>취소</button>
          <button type="button" onClick={SignoutPost}>회원 탈퇴</button>
        </div>
      </ModalView>
    </ModalBackdrop>
    {
      signoutCheck ? <SignoutCheckModal />
      : ''
    }
    </div>
  )
}