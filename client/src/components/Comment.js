import React, {useState} from "react";
import styled from "styled-components";

const CommentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: flex-start;
  /* margin: 5px; */
  border: 1px black;
  padding: 5px 0px;
  /* height: 3em; */
  width: 100%;
`;

const UserImage = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 10px;
  border-radius: 70%;
  overflow: hidden;
`;

const CommentContentWrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
  width: 100%;
  position: relative;

  .userNickname {
    font-weight: bold;
    padding-right: 5px;
  }

  #editComment {
    /* max-width: 340px; */
    /* height: 6.25em; */
    /* border: none; */
    resize: none;
    width: auto;
    height: auto;
  }
`;

const InfoAndAlert = styled.div`
  font-size: smaller;
  color: grey;
  /* padding: 0; */
  .test {
    margin-right: 5px;
  }
`;

export default function Comment({ comment, modComment, delComment }) {

  const [edit, setEdit] = useState(false)
  const handleEdit = () => {
    setEdit(!edit)
  }

  const [text, setText] = useState('')
  const handleText = (event) => {
    setText(event.target.value)
  }

  const sendModComment = ([id, text]) => {
    modComment([id, text])
    setEdit(!edit)
  }

  return (
    <CommentWrapper>
      <UserImage
        src={comment.image} onError={(e) => e.target.src = `/img/gitHubLogo.png`}
      />
      <div>
        <CommentContentWrapper>
          {/* 위에서부터 닉네임, 내용, 버튼? */}
          <span className="userNickname">{comment.nickname}</span>
          { !edit ? 
            <span className="UserComment">{comment.comment}</span>
            : <textarea id='editComment' defaultValue={comment.comment} onChange={handleText}/>
          }
        </CommentContentWrapper>
        <InfoAndAlert>
          <span className='test'>{comment.createdAt}</span>
          {!edit ? 
            <span>
              <span className='test' onClick={handleEdit}>수정</span>
              <span className='test' onClick={() => delComment(comment.id)}>삭제</span>
            </span>
            :
            <span>
              <span className='test' onClick={() => sendModComment([comment.id, text])}>저장</span>
              <span className='test' onClick={handleEdit}>취소</span>
            </span>
          }
        </InfoAndAlert>
      </div>
    </CommentWrapper>
  );
}
