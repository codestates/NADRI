import React from "react";
import styled from "styled-components";

const ChageUserInfoContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

    .user-profile-picture {
      width: 8rem;
      border: 1px solid black;
      border-radius: 50%;
      margin-bottom: 10px;
      > img {
        display: block;
        width: 100%;
        height: auto;
      }
    }
    .user-profile-img-edit {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 3rem;

      > img {
        width: 25px;
      }
    }
  
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-contnet: center;
  margin-bottom: 1.7rem;
`

const InputUserInfo = styled.div`
  display: flex;
  margin-bottom: 1rem;

  label {
    display: inline-block;
    font-size: 1.1rem;
    width: 7rem;
    height: 2rem;
    text-align: center;
    line-height: 2rem;
    border: 1px solid black;
    border-radius: 5px;
    margin-right: 2rem;
  }

  input {
    display: inline-block;
    width: 15rem;
    height: 2rem;
    border: 1px solid black;
    border-radius: 5px;
    outline: none;
    padding-left: 10px;
  }

  button {
    display: inline-block;
    width: 3rem;
    height: 2rem;
    margin-left: 3rem;
    background-color: white;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 5px;
  }

  button:active {
    background-color: pink;
    color: white;
  }
`

export default function ChageUserInfo () {
  return (
    <ChageUserInfoContainer>
      <div className="user-profile-img-edit">
        <div className="user-profile-picture"><img src="/gitHubLogo.png" alt="user-profile-img" /></div>
        <img src="/edit.png" /> {/* 여기 나중에 input태그 추가해야할듯 */}
      </div>
      <InputContainer>
        <InputUserInfo>
          <label htmlFor="nickname">닉네임</label>
          <input type={"text"} name="nickname"></input>
          <button type="button">변경</button>
        </InputUserInfo>
        <InputUserInfo>
          <label htmlFor="password">비밀번호</label>
          <input type={"password"} name="password"></input>
        </InputUserInfo>
        <InputUserInfo>
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <input type={"password"} name="passwordCheck"></input>
          <button type="button">변경</button>
        </InputUserInfo>
      </InputContainer>

      <span>이미 사용 중인 닉네임 입니다. or 비밀번호가 일치하지 않습니다.</span>
    </ChageUserInfoContainer>
  )
}