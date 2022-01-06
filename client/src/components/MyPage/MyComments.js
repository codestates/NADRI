import React from "react";
import styled from "styled-components";
import commentsDummy from '../../assets/comments'
import Comment from './Comment'

const MyCommentsContainer = styled.div`

`

export default function MyComments() {
  console.log(commentsDummy)
  return (
    <MyCommentsContainer>
      {
        commentsDummy.map((comment, idx) => <Comment key={idx} comment={comment} />)
      }
    </MyCommentsContainer>
  )
}