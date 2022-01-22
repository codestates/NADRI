import axios from "axios";
import React from "react";
import styled from "styled-components";
import { ModalBackdrop } from "../LoginModal/LoginStyled";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {useState} from 'react'
import SignoutCheckModal from '../SignoutModal/SignoutCheck'
import { signupModal, loginModal, authState, userInfo, gLogIn, kLogIn} from '../../../redux/actions';

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

    > button {
      width: 8rem;
      height: 3rem;
      border-radius: 10px;
      border: 0px solid black;
      background-color: #88ccff;
      font-size: 1.1rem;
      cursor: pointer;
      font-family: 'NanumSquare', arial;
      box-shadow: 2px 2px 2px 1px rgb(180 180 180);
      color: white;
      font-weight: bold;
    }
    >button:active {
      position: relative;
      top: 2px;
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

export default function SuccessSignupModal() {
  const [state, setState] = useState(true)
  function test() {
    setState(false)
  }
  return (
    <div>
      {
        state ?
        <ModalBackdrop onClick={test}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <span>회원가입이 정상적으로 완료되었습니다!</span>
        <div className="buttonContainer">
          <button onClick={test}>확인</button>
        </div>
      </ModalView>
    </ModalBackdrop>
    :
    ''
      }
    </div>
  )
}