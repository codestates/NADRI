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
`

export const PostImg = styled.div`
  width: 7rem;
  border: 1px solid black;
  border-radius: 5px;
  text-align:center;
  height: 7rem; // 이 부분이 중요했음

  > img {
    display: block;
    width: 100%;
    height: 100%;
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
    margin-bottom: 1rem;
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
`

// export const PostContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   justify-content: flex-start;
//   margin: 5px;
//   border: 1px solid black;
//   height: 33.3%;
//   width: 90%;
//   border-radius: 10px;
//   margin-bottom: 1rem;
//   padding: 1rem;
//   gap: 2rem;
// `;

// export const PostImg = styled.div`
  
//   width: 8rem;
//   border: 1px solid black;
//   border-radius: 5px;
//   /* text-align:center; */
// //   > img {
// //     display: block;
// //     width: 100%;
// //     height: 100%;
// //   }


//   .imgContent {
//     display: block;
//     width: 100%;
//     height: 100%;
//     margin-right: 10px;
//     border-radius: 5px;
//     overflow: hidden;
//   }

//   //   width: 8rem;
// //   border: 1px solid black;
// //   border-radius: 5px;
// //   text-align:center;
// //   > img {
// //     display: block;
// //     width: 100%;
// //     height: 100%;
// //   }
// `;

// export const PostInfo = styled.div`
//   margin-bottom: 5px;

//   .userNickname {
//     font-weight: bold;
//     padding-right: 5px;
//   }

//   .title {
//      display: flex;
//      align-items: center;
//      width: 100%;
//      height: 2rem;
//      border: 1px solid black;
//      border-radius: 5px;
//      margin-bottom: 1rem;
//      padding: 0.2rem 0.2rem;
//      font-weight: bold;

//   }

//   .desc {
//     height: 4rem;
//     width: 100%;
//     border-radius: 5px;
//     border: 1px solid black;
//     padding: 0.2rem 0.2rem;
//     line-height: 1.2;
   
//     white-space: nowrap;
//     overflow: hidden;
//     white-space: normal;
    
//     display: -webkit-box;
//     -webkit-line-clamp: 3;
//     -webkit-box-orient: vertical;
//   }

// `;



export default function MyPosts ({post}) {

  return (
    <PostContainer>
      <Link to={`/detail/${post.id}`} state={post}>
       <PostImg className="imgContainer">
        <img className="imgContent" src={`${post.image}`} onError={(e) => e.target.src = `/img/gitHubLogo.png`} />
       </PostImg>
      </Link>
      <PostInfo>
        <div className="title">{post.title}</div>
        <div className="desc">{post.content}</div>
      </PostInfo>
    </PostContainer>
  )
}