import React from "react";
import styled from "styled-components";

const CommentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: flex-start;
  margin: 5px;
  border: 1px black;
  height: 3em;
  width: 90%;
`;

const UserImage = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 10px;
  border-radius: 70%;
  overflow: hidden;
`;

const CommentContentWrapper = styled.div`
  margin-bottom: 5px;

  .userNickname {
    font-weight: bold;
    padding-right: 5px;
  }
`;
const InfoAndAlert = styled.div``;

export default function Comment({ comment }) {
  return (
    <CommentWrapper>
      <UserImage
        src={comment.image} onError={(e) => e.target.src = `/img/gitHubLogo.png`}
      />
      <div>
        <CommentContentWrapper>
          {/* 위에서부터 닉네임, 내용, 버튼? */}
          <span className="userNickname">{comment.nickname}</span>
          <span className="UserComment">{comment.comment}</span>
        </CommentContentWrapper>
        <InfoAndAlert>
          <span>{comment.createdAt}</span>
        </InfoAndAlert>
      </div>
    </CommentWrapper>
  );
}
