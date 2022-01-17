import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


export const PostContainer = styled.div`
display: flex;
border: 1px solid black;
border-radius: 10px;
margin-bottom: 3rem;
padding: 1rem;
gap: 2rem;
width: auto;
/* height: auto; */
flex-direction: row;


  & {
    .imgContainer {
      transition: transform 0.2s linear;
      transform: scale(1);
      /* height: 98%; */
    }
  }

  &:hover {
    .imgContainer {
      transition: all 0.2s linear;
      border:none;
      transform: scale(1.4);
    }
  }

  @media (max-width:650px){
    flex-direction: column;
  }

`

export const PostImg = styled.div `
  width: 6.5rem;
  border: 1px solid black;
  border-radius: 5px;
  text-align:center;
  height: 6.5rem; // 이 부분이 중요했음

  @media (max-width:650px){
    flex-direction: column;
    width: auto;
    height: 100%;
  }
  
  /* > img {
    display: flex;
    width: 100%;
    height: 100%;
  } */
  .imgContent {
    display: flex;
    width: 100%;
    height: 100%;
  }

`

export const PostInfo = styled.div`
  width: 100%;
  cursor: grab;
  .title {
    /* display: flex; */
    align-items: center;
    width: 50%;
    height: 2rem;
    border: 1px solid black;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    padding: 0.2rem 0.2rem;
    float: left;
    font-weight: bold;
    /* margin-right:1rem; */

    white-space: nowrap;
    overflow: hidden;
    white-space: normal;
    /* text-overflow: ellipsis */

    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-height: 1.5;

  }

  .desc {
    height: 4rem;
    width: 100%;
    border-radius: 5px;
    border: 1px solid black;
    padding: 0.2rem 0.2rem;
    line-height: 1.2;
   
    white-space: nowrap;
    overflow: hidden;
    white-space: normal;
    
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .uptime {
    /* height: 1rem; */
    border-radius: 5px;
    border: 1px solid black;
    padding: 0.2rem 0.2rem; 
    overflow: hidden;
    /* margin-top: 0.5rem; */
    float: left;
    width: 50%;
    height: 2rem;
    margin-bottom: 0.5rem;
    align-items: center;
    display: flex;
    /* margin-left: 1rem; */
  }
  .uptimeMobile {
    display: none;
  }

  @media screen and (max-width:650px){
    .uptime {
    display: none;
    }
    .uptimeMobile{
    border-radius: 5px;
    border: 1px solid black;
    padding: 0.2rem 0.2rem; 
    overflow: hidden;
    /* margin-top: 0.5rem; */
    float: left;
    width: 50%;
    height: 2rem;
    margin-bottom: 0.5rem;
    align-items: center;
    display: flex;
    }
  
  }

`

export default function MyPosts ({post}) {

  return (
    <PostContainer>
      <Link to={`/detail/${post.id}`} state={post}>
       <PostImg className="imgContainer">
        <img className="imgContent" src={`${post.image}`} onError={(e) => e.target.src = `/img/gitHubLogo.png`} />
       </PostImg>
      </Link>
      <PostInfo>
        <div className="titleAndUptime">
        <div className="title">{post.title}</div>
        
        <div className='uptime'>작성일: {post.createdAt}</div>
        <div className='uptimeMobile'>{post.createdAt}</div>
        
        </div>
        <div className="desc">{post.content}</div>
      </PostInfo>
    </PostContainer>
  )
}