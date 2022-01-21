import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


export const PostContainer = styled.div`
display: flex;
/* border: 1px solid #f1eae4; */
border-radius: 10px;
margin-bottom: 3em;
padding: 1em;
gap: 2em;
width: auto;
/* height: auto; */
flex-direction: row;
height: 11rem;
align-items: center;
background: #f9fafc;
box-shadow: 2px 2px 2px 1px rgb(180 180 180);
cursor: pointer;
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

      @media (max-width:650px){
        transform: scale(1)
      }
    }
  }

  @media (max-width:650px){
    flex-direction: column;
    height: auto;
    align-items: stretch;
  }

`

export const PostImg = styled.div `
  width: 6.5rem;
  /* border: 1px solid black; */
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
    object-fit: cover;

  }

`

export const PostInfo = styled.div`
  width: 100%;
  cursor: grab;
  color: black;
  .titleAndUptime {
    flex-direction: row;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

  .title {
    /* display: flex; */
    align-items: center;
    width: 20%;
    height: auto;
    /* border: 1px solid black; */
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
    line-height: 1.6;
    /* cursor : pointer ; */
  }

  .address {
    width: 50%;
    /* border: 1px solid black; */
    height: auto;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    white-space: nowrap;
    overflow: hidden;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-height: 1.5;
    text-align: left;
  }

  .uptime {
    /* height: 1rem; */
    border-radius: 5px;
    /* border: 1px solid black; */
    padding: 0.2rem 0.2rem; 
    overflow: hidden;
    /* margin-top: 0.5rem; */
    float: left;
    width: 30%;
    height: auto;
    margin-bottom: 0.5rem;
    align-items: center;
    display: flex;
    line-height: 1.5;
    justify-content: center;
    /* margin-left: 1rem; */
  }
  .uptimeMobile {
    display: none;
  }

  @media screen and (max-width:1250px){
    .uptime {
    display: none;
    }
    .uptimeMobile{
    border-radius: 5px;
    /* border: 1px solid black; */
    padding: 0.2rem 0.2rem; 
    overflow: hidden;
    /* margin-top: 0.5rem; */
    float: left;
    width: 30%;
    height: auto;
    margin-bottom: 0.5rem;
    align-items: center;
    display: flex;
    justify-content: center;
    line-height: 1.5;
    }
  }
  @media screen and (max-width:950px){
    .uptimeMobile{
      padding: 0.2rem 0 0.2rem 0;
    }
  }

  @media screen and (max-width:650px){
    .title{
      width: 50%;
    }
    .uptimeMobile{
      width: 50%;
    }
    .address {
      width: 100%;
    }
  }

}

  .desc {
    height: 4rem;
    width: 100%;
    border-radius: 10px;
    /* border: 1px solid black; */
    padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    line-height: 1.3;
    text-align: start;

    white-space: nowrap;
    overflow: hidden;
    white-space: normal;
    
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    background-color: #fdfdff;
  }

  

`

export default function MyPosts ({post}) {

  return (
    
    <PostContainer>
      <Link to={`/detail/${post.id}`} state={post}>
        <PostImg className="imgContainer">
        <img className="imgContent" src={`${post.image}`} onError={(e) => e.target.src = `/img/default-image.svg`} />
        </PostImg>
      </Link>
      <PostInfo>
        <div className="titleAndUptime">
          <div className="title">{post.title}</div>
          <div className='uptime'>작성일: {post.createdAt}</div>
          <div className='uptimeMobile'>{post.createdAt}</div>
          <div className="address">{post.address}</div>
        </div>
        <div className="desc">{post.content}</div>
      </PostInfo>
    </PostContainer>
  )
}