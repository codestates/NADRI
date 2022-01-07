import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { ModalBackdrop } from "../LoginModal/LoginStyled";
import { ModalView } from "./Signout";
import {useDispatch, useSelector} from 'react-redux'
import { authState } from '../../../redux/actions/index'
import { useNavigate } from "react-router-dom";

export default function SignoutCheckModal() {
  const [signoutCheck, setSignoutCheck] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const curAuthState = useSelector(state => state.changeAuthState);

  function signoutCheckHandler() {
    setSignoutCheck(true)
    dispatch(authState(curAuthState))
    navigate('/')
  }

  return (
    <ModalBackdrop>
      <ModalView>
        <span>탈퇴처리가 정상적으로 완료되었습니다.</span>
        <div className="buttonContainer">
          <button type="button" onClick={signoutCheckHandler}>확인</button>
        </div>
      </ModalView>
    </ModalBackdrop>
  )
}