import React from "react";
import styled from "styled-components";



export const PostContainer = styled.div`
  display: flex;
  border: 1px solid black;
  border-radius: 10px;
  margin-bottom: 3rem;
  padding: 1rem;
  gap: 2rem;

  & {
    .imgContainer {
      transition: transform 0.2s linear;
      transform: scale(1);
    }
  }

  &:hover {
    .imgContainer {
      transition: all 0.2s linear;
      border:none;
      transform: scale(1.4);
    }
  }
`

export const PostImg = styled.div`
  width: 8rem;
  border: 1px solid black;
  border-radius: 5px;
  > img {
    display: block;
    width: 100%;
    height: auto;
  }
`

export const PostInfo = styled.div`
  width: 20rem;
  cursor: grab;
  .title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 2rem;
    border: 1px solid black;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    padding: 0.2rem 0.2rem;
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
    margin-top: 0.5rem;
  }
`

export default function MyPosts ({post}) {

  
  return (
    <PostContainer>
      <PostImg className="imgContainer">
        <img src={`${post.img}`}></img>
      </PostImg>

      <PostInfo>
        <div className="title">{post.spotTitle}</div>
        <div className="desc">{post.spotDesc}</div>
      </PostInfo>
    </PostContainer>
  )
}