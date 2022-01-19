import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import MyPosts from "../components/MyPage/MyPosts";
import ChageUserInfo from "../components/MyPage/ChangeUserInfo";
import Sidebar from "../components/MyPage/Sidebar";
import Comment from "../components/MyPage/Comment";
import commentsDummy from "../assets/comments";
import dummy from "../assets/dummy";
import axios from 'axios'
import { Link } from "react-router-dom";


const MypageContainer = styled.div`
  padding: 3.5rem 9vw;
  display: flex;
  flex-direction: column;
  cursor: grab;
  font-family: 'NanumSquare', 'Cafe24', arial;

  @media (max-width:700px){
    padding: 2rem 2vw;
  }

`

const UserProfileContainer = styled.div`
  width: 78.5vw;
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
  /* border: 1px solid black; */
  border-radius: 10px;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  /* margin-left: 18.5vw; */
  background-color: #f7f7f7;
  box-shadow: 2px 2px 2px 1px rgb(180 180 180);

  .user-profile-left{
    width: 14vw;
    /* border: 1px solid black; */
    margin-right: 3vw;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    line-height: 1.5;
    font-size: larger;
    font-weight: bold;

  }
  
  .user-profile-right {
    /* border: 1px solid black; */
    width: 13vw;

    >img {
      width: 100%;
      height: 100%;
    }
  }

  .user-profile-content{
    width: 59vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-profile-picture {
    width: 8rem;
    height: 8rem;
    /* border: 1px solid black; */
    border-radius: 50%;
    
    ${(props) => {
      if(props.img && props.oauth===false) {
        return (
          `
          background-image: url(https://nadri.s3.ap-northeast-2.amazonaws.com/${props.img});
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
          `
          )
        } 
        else if(props.img && props.oauth===true) {
          return (
            `
            background-image: url(${props.img});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
            `
            )
          }
          else {
            return (
              `
              background-image: url(img/gitHubLogo.png);
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center center;
              `
              )
            }
          }}
  }
  
  /* @media screen and(max-width:700px){
   
  } */

  .user-profile-info {
    display: flex;
    gap: 1rem;
    margin-left: 2rem;
    
    >.user-profile-header {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      > div {
        padding: 0.1rem;
        font-size: 1.1rem;
        /* border: 1px solid black; */
        border-radius: 10px;
        margin: 0.1rem;
      }
    }

    >.user-profile {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      > div {
        padding: 0.5rem 0.5rem;
        font-size: 1.1rem;
        /* border: 1px solid black; */
        border-radius: 10px;
      }
    }
  }

  @media (max-width:900px){
    flex-direction: column;
    align-items: center;
    width: 82vw;
    margin: auto;
    margin-bottom: 0.5rem;
    padding: 0.5rem;

    .user-profile-content{
      width: 80vw;
      flex-direction: column;
      align-items: center;

      .user-profile-picture{
        width:12rem;
        height: 12rem;
        margin-bottom: 1rem;
      }

    }

    .user-profile-left{
      width: 82vw;
      margin-right: 0;
      margin-top: 0.5rem;
      > br{
        display: none;
      }
    }

    .user-profile-right{
      display: none;
    }

    .user-profile-info {
      margin-left: 0;
    }
  }
  @media (max-width:700px){
    width: 90vw;
  }

`

const UserMainContents = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .content-container {
    /* width: 36rem; */
    width: 60vw;
    /* height: 33rem; */
    height: 52vh;
    /* border: 1px solid #f1eae4; */
    overflow: auto;
    padding: 1.5rem;
    border-radius: 10px;
    /* margin-right: 15rem; */
    margin: auto;
    text-align: center;

    >div:last-child {
      margin-bottom: 0;
    }

    &::-webkit-scrollbar{
      width: 0.6rem;
    }
  
    &::-webkit-scrollbar-thumb{
        height: 17%;
        background-color: #f1eae4;
        border-radius: 10px;    
    }
  
    &::-webkit-scrollbar-track{
        background-color: rgba(0,0,0,0);
    }
  }

  @media screen and (max-width:900px){
      .content-container {
      width: 90vw;
      /* padding: 1.5rem; */
      }
  }

  @media screen and (max-width:700px){
    .content-container {
      padding: 1rem 0.5rem 1rem 1rem;
      }
  }

`

export default function MyPage() {
  const [curContent, setCurContent] = useState('내 게시글')
  const curUserInfo = useSelector(state => state.getUserInfo);
  // console.dir(curUserInfo)
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    console.log('myComment init')
    axios.get(`${process.env.REACT_APP_API_URL}/comment`)
    .then(res => {
      console.log(res)
      setComments(res.data.data)})
    axios.get(`${process.env.REACT_APP_API_URL}/like`)
    .then(res => {
      console.log(res)
      setLikes(res.data.data)
    })
  }, [])

  useEffect(()=> {
    console.log('myPost init')
    axios.get(`${process.env.REACT_APP_API_URL}/auth/me/post`)
    .then(res => {
      console.log(res)
      setPosts(res.data.data)
    })
  }, [])
  
  function contentRender() {
    if(curContent === '내 게시글') {
      if(posts!==null) return posts.map((post, idx) => <MyPosts key={idx} post={post} />)
      else return '작성한 게시글이 없습니다'
    }
    else if(curContent === '회원정보 수정') {
      return <ChageUserInfo />
    }
    else if(curContent === '내 댓글') {
      if (comments.length >= 1) return comments.map((comment, idx) => <Link to={`/detail/${comment.postId}`}><Comment key={idx} comment={comment} /></Link>)
      else return '댓글이 없습니다'
    }
    else if(curContent === '즐겨찾기') {
      if (likes.length >= 1) return likes.map((like, idx) => <Link to={`/detail/${like.postId}`}><Comment key={idx} comment={like} /></Link>)
      else return '즐겨찾기한 장소가 없습니다'
    }
  }

  return (
  <MypageContainer>
    <UserProfileContainer img={curUserInfo.image} oauth={curUserInfo.oauth}>
      <div className="user-profile-left">{curUserInfo.nickname} 님 <br/> 환영합니다!</div>
      <div className="user-profile-content">
      
      <div className="user-profile-picture"></div>
      <div className="user-profile-info">
        <div className="user-profile-header">
          <div>닉네임</div>
          <div>이메일</div>
          <div>가입일</div>
        </div>
        <div className="user-profile">
          <div>{curUserInfo.nickname}</div>
          <div>{curUserInfo.email}</div>
          <div>
            {/* {curUserInfo.createdAt} */}
            {curUserInfo ? curUserInfo.createdAt.split(' ')[0]:
          null}
          </div>
        </div>
      </div>

      </div>
        <div className="user-profile-right">
          <img className=""user-profile-right-img src="/img/mypage-right-icon.png" alt="왼쪽 그림" />
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