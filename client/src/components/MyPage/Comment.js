import React from "react";
import styled from "styled-components";
import { PostContainer, PostImg, PostInfo } from "./MyPosts";


export default function Comment ({comment}) {
  return (
      <PostContainer>
        <PostImg className="imgContainer">
          <img src={`${comment.image}`} onError={(e) => e.target.src = `/img/gitHubLogo.png`} />
        </PostImg>

        <PostInfo>
          <div className="title">{comment.title}</div>
          <div className="desc">{comment.comment}</div>
        </PostInfo>
      </PostContainer>
  )
}