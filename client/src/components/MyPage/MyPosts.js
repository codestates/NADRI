import React from "react";
import styled from "styled-components";



const PostContainer = styled.div`
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

const PostImg = styled.div`
  width: 8rem;
  border: 1px solid black;
  border-radius: 5px;
  > img {
    display: block;
    width: 100%;
    height: auto;
  }
`

const PostInfo = styled.div`
  width: 20rem;
  cursor: grab;
  .title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 2rem;
    border: 1px solid black;
    border-radius: 5px;
    margin-bottom: 1rem;
    padding: 0.2rem 0.2rem;
  }

  .desc {
    height: 5rem;
    border-radius: 5px;
    border: 1px solid black;
    padding: 0.2rem 0.2rem;
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