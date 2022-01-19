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
`

const UserProfileContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 4rem;

  .user-profile-picture {
    width: 8rem;
    height: 8rem;
    border: 1px solid black;
    border-radius: 50%;

    ${(props) => {
      if(props.img) {
        return (
          `
          background-image: url(https://nadri.s3.ap-northeast-2.amazonaws.com/${props.img});
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
          `
        )
      } else {
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
  justify-content: center;
  flex-wrap: wrap;

  .content-container {
    width: 36rem;
    height: 33rem;
    border: 1px solid black;
    overflow: auto;
    padding: 2rem;
    border-radius: 10px;
    /* margin-right: 15rem; */
    margin: auto;

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

  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    console.log('myComment init')
    axios.get(`${process.env.REACT_APP_API_URL}/comment`)
    .then(res => {
      // console.log(res)
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
      if (comments.length > 0) return comments.map((comment, idx) => <Link to={`/detail/${comment.postId}`}><Comment key={idx} comment={comment} /></Link>)
      else return '댓글이 없습니다'
    }
    else if(curContent === '즐겨찾기') {
      if (likes.length > 0) return likes.map((post, idx) => <Link to={`/detail/${post.postId}`}><Comment key={idx} comment={post} /></Link>)
      else return '즐겨찾기한 장소가 없습니다'
    }
  }

  return (
  <MypageContainer>
    <UserProfileContainer img={curUserInfo.image}>
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