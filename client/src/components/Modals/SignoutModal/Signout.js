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
  width: 45rem;
  height: 20rem;
  background-color: white;
  border: 2px solid black;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6rem;

  span {
    font-size: 2rem;
  }

  .buttonContainer {
    display: flex;
    justify-content: center;
    gap: 4rem;

    >button {
      width: 10rem;
      height: 3rem;
      border-radius: 10px;
      border: 1px solid black;
      background-color: white;
      font-size: 1.3rem;
      cursor: pointer;
    }
    >button:active {
      background-color: pink;
      color: white;
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
    axios.delete('https://localhost:8443/auth/signout')
    .then((res) => {
      signoutCheckHandler()
    })
  }

  return (
    <div>
    <ModalBackdrop onClick={signOutHandler}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <span>정말 회원 탈퇴 하시겠습니까?</span>
        <div className="buttonContainer">
          <button type="button" onClick={signOutHandler}>취소</button>
          <button type="button" onClick={SignoutPost}>회원탈퇴</button>
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