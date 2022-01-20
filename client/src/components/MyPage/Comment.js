import React from "react";
import styled from "styled-components";
import { PostContainer, PostImg, PostInfo } from "./MyPosts";


export default function Comment ({comment}) {
  return (
      <PostContainer>
        <div>
        <PostImg className="imgContainer">
          <img className="imgContent" src={`${comment.image}`} onError={(e) => e.target.src = `/img/default-image.svg`} />
        </PostImg>
        </div>
        <PostInfo>
          <div className="titleAndUptime">
            <div className="title">{comment.title}</div>
            <div className='uptime'>작성일: {comment.createdAt}</div>
            <div className='uptimeMobile'>{comment.createdAt}</div>
            <div className="address">{comment.address}</div>
          </div>
          {comment.comment ? <div className="desc">{comment.comment}</div> 
          : <div className="desc">{comment.content}</div> }
        </PostInfo>
      </PostContainer>
  )
}