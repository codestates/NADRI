import React from "react";
import styled from "styled-components";
import SignoutModal from '../../components/Modals/SignoutModal/Signout'
import { useState } from "react";

const MyPageSideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  width: 20rem;
  height: 16rem;
  /* margin-left: 15rem; */
  margin: auto;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 2rem;
    border: 1px solid black;
    border-radius: 10px;
    cursor: pointer;
  }

  > div:active {
    position: relative;
    top: 2px;
  }
`

export default function Sidebar({setCurContent}) {

  const [signOut, setSignOut] = useState(false)

  function signOutHandler() {
    setSignOut(!signOut)
  }

  function changeCurContent (e) {
    setCurContent(e.target.textContent)
  }

  return (
    <div>
    <MyPageSideBar>
        <div onClick={(e) => changeCurContent(e)}>내 게시글</div>
        <div onClick={(e) => changeCurContent(e)}>내 댓글</div>
        <div onClick={(e) => changeCurContent(e)}>즐겨찾기</div>
        <div onClick={(e) => changeCurContent(e)}>회원정보 수정</div>
        <div onClick={signOutHandler}>탈퇴하기</div>
        
    </MyPageSideBar>
    {
      signOut ? <SignoutModal signOutHandler={signOutHandler} />
      : ''
    }
    </div>
  )
}