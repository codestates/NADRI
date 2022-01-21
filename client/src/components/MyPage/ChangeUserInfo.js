import axios from "axios";
import React from "react";
import styled from "styled-components";
import { useState, useRef } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { changeUserNickname, changeProfile, userInfo } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../Modals/MyPageModal/SuccessModal";

const ChageUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow: hidden;
  padding: 0.5rem;
  border-radius: 10px;
  background-color: #f9fafc;
  box-shadow: 2px 2px 2px 1px rgb(180 180 180);

    .user-profile-picture {
      width: 10rem;
      height: 10rem;
      /* border: 1px solid black; */
      border-radius: 50%;
      margin-bottom: 10px;

      

      ${(props) => {
        
        if(props.img) {
          return (
            `
            background-image: url(${props.img.slice(0,4) === 'http' ? props.img : 'https://d2wfp1q5b3ikod.cloudfront.net/'+props.img});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center center;
            `
          )
        } else {
          console.log(props.img)
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
      margin-bottom: 1rem;

      .img-edit-span{
        /* border: 1px solid black; */
        width: 1.5rem;
        margin: 0.2rem;
        
        .img-edit-icon {
          cursor: pointer;
          width: 1.5rem;
          vertical-align: sub;
        }
      }
      /* > img {
        cursor: pointer;
        width: 25px;
      } */

      label {
        font-size: 1rem;
        cursor: pointer;
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
  margin-bottom: 0.5rem;
`

const InputUserInfo = styled.div`
  display: flex;
  margin-bottom: 1rem;

  label {
    display: inline-block;
    font-size: 1rem;
    width: 7rem;
    height: 2rem;
    text-align: right;
    line-height: 2rem;
    /* border: 1px solid black; */
    border-radius: 5px;
    margin-right: 0.5rem;
    padding-right: 0.5rem;
  }

  input {
    display: inline-block;
    width: 15rem;
    height: auto;
    border: 0px solid black;
    border-radius: 5px;
    outline: none;
    box-shadow: 2px 2px 2px 1px rgb(180 180 180);

    &:focus {
      border: 1px solid #ff7400;
    }
  }

  button {
    display: inline-block;
    width: 3rem;
    height: 2rem;
    margin-left: 0.3rem;
    background-color: white;
    border: 0px solid black;
    cursor: pointer;
    border-radius: 5px;
    font-family: 'NanumSquare',arial;
    box-shadow: 2px 2px 2px 1px rgb(180 180 180);
    
    &:hover {
      color: #ff7400;
    }
  }

  button:active {
    position: relative;
    top: 2px;
  }

  @media (max-width:700px){
    input {
      width: 35vw;
    }
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
    .catch(err => {
      setDangerMessage('이미 사용중인 닉네임입니다.')
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
      dispatch(changeProfile(res.data.data.image))
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

        {curUserInfo.oauth ? 
          <label htmlFor="profileImgLabel">프로필 사진 변경이 불가합니다.</label> 
          :
          <div>
            <label>프로필 사진 변경</label>
            <input type={'file'} accept='image/*' name='img' ref={profileImg} onChange={picChange}/>
            <span className="img-edit-span">
              <img className="img-edit-icon" src="/img/edit.png" onClick={handleClick} />
            </span>
          </div>
        }

      </div>

      <InputContainer>
        <InputUserInfo inputs={inputs}>
          <label htmlFor="nickname">닉네임</label>
          <input type={"text"} name="nickname" value={inputs.nickname} onChange={(e) => getUserInfo(e)}></input>
          <button type="button" name="nickname" onClick={(e) => patchUserNickname(e)}>변경</button>
        </InputUserInfo>
        <InputUserInfo inputs={inputs}>
          <label htmlFor="password">비밀번호</label>
          {curUserInfo.oauth ? <input disabled /> : <input className="input" value={inputs.password} type={"password"} name="password" onChange={(e) => getUserInfo(e)} />}
        </InputUserInfo>
        <InputUserInfo inputs={inputs}>
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          {curUserInfo.oauth ? <input disabled /> : <input type={"password"} value={inputs.passwordCheck} name="passwordCheck" onChange={(e) => getUserInfo(e)}/>}
          {curUserInfo.oauth ? <button type="button" disabled>변경</button> : <button type="button" name="passwordCheck" onClick={changePassword}>변경</button>}
        </InputUserInfo>
        <DangerMessage>{dangerMessage}</DangerMessage>
      </InputContainer>
      {
        curSuccessModal ? <SuccessModal changeTarget={changeTarget} setSuccessModal={setSuccessModal} curSuccessModal={curSuccessModal}/>
        : ''
      }
    </ChageUserInfoContainer>
  )
}