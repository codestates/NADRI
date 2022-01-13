import React from "react";
import styled from "styled-components";
import { ModalBackdrop } from "../LoginModal/LoginStyled";

const ModalView = styled.div`
  width: 30rem;
  height: 10rem;
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  position: relative;
  font-size: 20px;

  .close-X {
    position: absolute;
    top: 0;
    right: 3px;
    cursor: pointer;
  }

  .closeBtn {
    width: 7rem;
    height: 2.5rem;
    border: none;
    background-color: pink;
    cursor: pointer;
    border-radius: 6px;
  }
  .closeBtn:active {
    color: white;
  }
`

export default function SuccessModal({setSuccessModal, curSuccessModal}) {
  function ModalHandler() {
    setSuccessModal(!curSuccessModal)
  }

  return (
    <ModalBackdrop onClick={ModalHandler}>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <span className="close-X" onClick={ModalHandler}>&#x2716;</span>
        <span>변경사항이 성공적으로 변경되었습니다.</span>
        <button type="button" className="closeBtn" onClick={ModalHandler}>확인</button>
        

      </ModalView>
    </ModalBackdrop>
  )
}