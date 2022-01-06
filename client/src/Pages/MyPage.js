import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import MyPosts from "../components/MyPage/MyPosts";
import ChageUserInfo from "../components/MyPage/ChangeUserInfo";
import Sidebar from "../components/MyPage/Sidebar";
import MyComments from "../components/MyPage/MyComments";
import dummy from "../assets/dummy";


const MypageContainer = styled.div`
  padding: 3.5rem 9vw;
  display: flex;
  flex-direction: column;
  cursor: grab;
`

const UserProfileContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 4rem;

  .user-profile-picture {
    width: 8rem;
    border: 1px solid black;
    border-radius: 50%;
    > img {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  .user-profile-info {
    display: flex;
    gap: 2rem;

    >.user-profile-header {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      > div {
        padding: 0.5rem 3rem;
        font-size: 1.2rem;
        border: 1px solid black;
        border-radius: 10px;
      }
    }

    >.user-profile {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      > div {
        padding: 0.5rem 1rem;
        font-size: 1.2rem;
        border: 1px solid black;
        border-radius: 10px;
      }
    }
  }
`

const UserMainContents = styled.div`
  display: flex;
  justify-content: space-around;

  .content-container {
    width: 45rem;
    height: 33rem;
    border: 1px solid black;
    overflow: auto;
    padding: 2rem;
    border-radius: 10px;
    margin-right: 15rem;

    >div:last-child {
      margin-bottom: 0;
    }

    &::-webkit-scrollbar{
      width: 10px;
    }
  
    &::-webkit-scrollbar-thumb{
        height: 17%;
        background-color: #d3d3d3;
        border-radius: 10px;    
    }
  
    &::-webkit-scrollbar-track{
        background-color: rgba(0,0,0,0);
    }
  }
`

export default function MyPage() {
  const [curContent, setCurContent] = useState('내 게시글')

  const curUserInfo = useSelector(state => state.getUserInfo);

  function contentRender() {
    if(curContent === '내 게시글') {
      return dummy.map((post,idx) => <MyPosts key={idx} post={post}/>)
    }
    else if(curContent === '회원정보 수정') {
      return <ChageUserInfo />
    }
    else if(curContent === '내 댓글') {
      return <MyComments />
    }
  }


  return (
  <MypageContainer>
    <UserProfileContainer>
      <div className="user-profile-picture"><img src="/gitHubLogo.png"></img></div>
      <div className="user-profile-info">
        <div className="user-profile-header">
          <div>닉네임</div>
          <div>이메일</div>
          <div>가입일</div>
        </div>
        <div className="user-profile">
          <div>{curUserInfo.nickname}</div>
          <div>{curUserInfo.email}</div>
          <div>{curUserInfo.createdAt}</div>
        </div>
      </div>
    </UserProfileContainer>


    <UserMainContents>
      <Sidebar setCurContent={setCurContent} />
        <div className="content-container">
            {
              contentRender()
            }
        </div>

    </UserMainContents>
  </MypageContainer>
  )
}