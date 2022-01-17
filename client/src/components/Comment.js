import React, {useState} from "react";
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
            : <textarea defaultValue={comment.comment} onChange={handleText} />
          }
        </CommentContentWrapper>
        <InfoAndAlert>
          <span>{comment.createdAt}</span>
        </InfoAndAlert>
      </div>
      <div>
          {!edit ? 
            <div>
              <div><button onClick={handleEdit}>수정</button></div>
              <div><button onClick={() => delComment(comment.id)}>삭제</button></div>
            </div>
            :
            <div>
              <div><button onClick={() => sendModComment([comment.id, text])}>저장</button></div>
              <div><button onClick={handleEdit}>취소</button></div>
          </div>
          }
      </div>
    </CommentWrapper>
  );
}
