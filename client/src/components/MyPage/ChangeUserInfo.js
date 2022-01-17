import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useState, useRef } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { changeUserNickname, changeProfile } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../Modals/MyPageModal/SuccessModal";

const ChageUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

    .user-profile-picture {
      width: 10rem;
      height: 10rem;
      border: 1px solid black;
      border-radius: 50%;
      margin-bottom: 10px;

      ${(props) => {
        if(props.img) {
          return (
            `
            background-image: url(https://nadri.s3.ap-northeast-2.amazonaws.com/${props.img});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
            `
          )
        } else {
          return (
            `
            background-image: url(/img/gitHubLogo.png);
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
            `
          )
        }
      }}
    };
    
    .user-profile-img-edit {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 3rem;

      > img {
        cursor: pointer;
        width: 25px;
      }
    }
  
  input {
    display: none;
  }
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    position: relative;
    top: 2px;
  }
`

const DangerMessage = styled.span`
  color: red;
  position: relative;
  transition: all 10s;
`

export default function ChageUserInfo () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const curUserInfo = useSelector(state => state.getUserInfo);
  // console.log(curUserInfo)
  const [inputs, setInputs] = useState({
    nickname: '',
    password: '',
    passwordCheck: ''
  })
  const [dangerMessage, setDangerMessage] = useState('')
  const [curSuccessModal, setSuccessModal] = useState(false)
  const [curInputs, setCurInputs] = useState({
    nicknameInput: true,
    passwordInput: true,
    passwordCheckInput: true
  })
  const [changeTarget, setChangeTarget] = useState('')
  // console.log(curInputs.passwordInput)
  function getUserInfo(e) {
    const {name, value} = e.target

    setInputs({
      ...inputs,
      [name]: value
    })
  }

  function patchUserNickname(e) { // input창에 아무것도 안누르고 변경버튼 눌렀을 경우
    const {nickname, password, passwordCheck} = inputs

    if(!nickname){
      setDangerMessage('변경할 닉네임을 적어주세요')
      return;
    }

    axios.patch(`${process.env.REACT_APP_API_URL}/auth/me`, {
      nickname
    })
    .then((res) => {
      dispatch(changeUserNickname(nickname))
      setSuccessModal(!curSuccessModal)
      resetInput(e)
      setChangeTarget(e.target.name)
      navigate('/mypage')
    })
  }

  const profileImg = useRef(null)

  function picChange(e) { // 이미지를 추가하는 함수
    const image = e.target.files
    const formData = new FormData() // formData생성
    formData.append('profile', image[0])  // formData에 profile이라는 이름으로 blob~~ 넣음

    axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_API_URL}/auth/me`,
      data: formData, // 어떤 레퍼런스는 files로 하던데 죽어도 안되서 변경
      headers: { 'content-type': 'multipart/form-data' },
    })
    .then((res) => {
      console.log(res.data)
      dispatch(changeProfile(res.data))
      setSuccessModal(!curSuccessModal)
      setChangeTarget(e.target.name)
      navigate('/mypage')
    })
  };

  function changePassword(e) {
    const {password, passwordCheck} = inputs
    
    if(!password) {
      setDangerMessage('변경할 비밀번호를 입력해주세요')
      return ;
    }
    if(!passwordCheck) {
      setDangerMessage('비밀번호 확인을 입력해주세요')
      return ;
    }
    if(password !== passwordCheck) {
      setDangerMessage('비밀번호를 확인하세요')
      return;
    } else {
      axios.patch(`${process.env.REACT_APP_API_URL}/auth/me`,{
        password
      })
      .then((res) => {
        setSuccessModal(!curSuccessModal)
        setDangerMessage('')
        setChangeTarget(e.target.name)
        resetInput(e)
      })
    }
  }

  const handleClick = () => {
    profileImg.current.click();
  }

  const resetInput = (e) => {
    const target = e.target.name
    if(target === 'passwordCheck') {
      setInputs({...inputs, [target]:'', password: ''})
      return;
    } else {
      setInputs({...inputs, [target]:''})
    }
  }

  return (
    <ChageUserInfoContainer img={curUserInfo.image}>
      <div className="user-profile-img-edit">
        <div className="user-profile-picture"></div>
        <input type={'file'} name='img' ref={profileImg} onChange={picChange}/>
        <img src="/img/edit.png" onClick={handleClick} />
      </div>

      <InputContainer>
        <InputUserInfo inputs={inputs}>
          <label htmlFor="nickname">닉네임</label>
          <input type={"text"} name="nickname" value={inputs.nickname} onChange={(e) => getUserInfo(e)}></input>
          <button type="button" name="nickname" onClick={(e) => patchUserNickname(e)}>변경</button>
        </InputUserInfo>
        <InputUserInfo inputs={inputs}>
          <label htmlFor="password">비밀번호</label>
          <input className="input" value={inputs.password} type={"password"} name="password" onChange={(e) => getUserInfo(e)} />
        </InputUserInfo>
        <InputUserInfo inputs={inputs}>
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <input type={"password"} value={inputs.passwordCheck} name="passwordCheck" onChange={(e) => getUserInfo(e)}></input>
          <button type="button" name="passwordCheck" onClick={changePassword}>변경</button>
        </InputUserInfo>
      </InputContainer>

      <DangerMessage>{dangerMessage}</DangerMessage>
      {
        curSuccessModal ? <SuccessModal changeTarget={changeTarget} setSuccessModal={setSuccessModal} curSuccessModal={curSuccessModal}/>
        : ''
      }
    </ChageUserInfoContainer>
  )
}