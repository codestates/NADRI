import React from "react";
import styled from "styled-components";
import SignoutModal from '../../components/Modals/SignoutModal/Signout'
import { useState } from "react";

const MyPageSideBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* border: 1px solid black; */
  border-radius: 10px;
  width: 15vw;
  height: 52vh;
  /* height: 16rem; */
  /* margin-left: 15rem; */
  margin: auto;
  background-color: #dfe3ee;
  box-shadow: 2px 2px 2px 1px rgb(180 180 180);

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    padding: 0.5rem 0.5rem;
    height: auto;
    /* border: 1px solid black; */
    border-radius: 10px;
    cursor: pointer;
    color: #2d1d1d;
    font-weight: 600;
  }

  > div:hover {
    color: #ff7400;
  }

  > div:active {
    position: relative;
    top: 2px;
  }

  @media (max-width:900px){
    flex-direction: row;
    justify-content: center;
    width: 82vw;
    height: auto;
    flex-wrap: wrap;
    padding: 0.5rem;
    margin-bottom: 0.5rem;

    > div {
      width: auto;
      margin: auto;
    }
  }

  @media (max-width:700px){
    width: 90vw;

    > div {
      margin: 0.2rem;
    }
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