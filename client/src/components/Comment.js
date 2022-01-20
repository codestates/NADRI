import React, {useState} from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux'

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
  width: 3rem;
  height: 3rem;
  margin-right: 10px;
  border-radius: 70%;
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

  .editComment {
    /* max-width: 340px; */
    /* height: 6.25em; */
    /* border: none; */
    width: 300px;
    resize: none;
    width: auto;
    height: auto;
    overflow:visible;
  }
`;

const InfoAndAlert = styled.div`
  font-size: smaller;
  color: grey;
  /* padding: 0; */
  .test {
    margin-right: 5px;
  }

  .click {
    cursor: pointer;
  }
`;

export default function Comment({ comment, modComment, delComment }) {

  const curUserInfo = useSelector(state => state.getUserInfo);
  const curAuthState = useSelector(state => state.changeAuthState);
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
          {
            !edit ?
            <div>
              <span className="userNickname">{comment.nickname}</span>
              <span className="UserComment">{comment.comment}</span>
            </div>
            : <textarea className='editComment' defaultValue={comment.comment} onChange={handleText}/>
          }
        </CommentContentWrapper>
        {curUserInfo.admin || curUserInfo.id === comment.userId || curAuthState ?
          <InfoAndAlert>
          <span className='test'>{comment.createdAt}</span>
          {!edit ? 
            <span>
              <span className='test click' onClick={handleEdit}>수정</span>
              <span className='test click' onClick={() => delComment(comment.id)}>삭제</span>
            </span>
            :
            <span>
              <span className='test click' onClick={() => sendModComment([comment.id, text])}>저장</span>
              <span className='test click' onClick={handleEdit}>취소</span>
            </span>
          }
        </InfoAndAlert>
        : null}
      </div>
    </CommentWrapper>
  );
}
