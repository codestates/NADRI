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
          {comment.comment ? <div className="desc">{comment.comment}</div> 
          : <div className="desc">{comment.content}</div> }
          <div className='uptime'>{comment.createdAt}</div>
        </PostInfo>
      </PostContainer>
  )
}