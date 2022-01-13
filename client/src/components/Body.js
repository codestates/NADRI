import React from 'react'
import styled from 'styled-components'
import MainPage from '../Pages/MainPage';
import PostPage from '../Pages/PostPage/PostPage'
import MyPage from '../Pages/MyPage';
import DetailPage from '../Pages/DetailPage';
import { Routes, Route, useNavigate, Navigate, BrowserRouter, Link, Switch } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';

const SidebarContainer = styled.span`
display: flex;
position: sticky;
left: 1rem;
top: 7rem;
margin-left: 0.5rem;
flex-wrap: wrap;
max-width: 3rem;
max-height: 3rem;

@media (max-width: 650px){
  left: 0.5rem;
}

.backButton{
  width: 70%;
  height: 70%;
  background: rgb(255,255,255);
  border-radius: 25px;
  border: 0px solid black;
  box-shadow: 2px 2px 2px 1px rgba(180, 180, 180);
  cursor: pointer;

  @media (max-width: 650px){
    width: 45%;
}

  &:hover {
      box-shadow: 
      inset 3px 3px 3px 0px rgba(200, 200, 200, 0.2), 
      2px 2px 2px 0px rgba(0, 0, 0, 0.1),
      2px 2px 2px 0px rgba(0, 0, 0, 0.1);
      transform: scale(1.1);
    }
    &:hover:after {
      width: 100%;
    }

}

.backIcon{
  width: 60%;
  height: 60%;
  color: #708090;
`

export default function Body () {

  const navigate = useNavigate()

  return (
    <div>
      <SidebarContainer>
        <button className="backButton" onClick={()=> navigate(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} className="backIcon" />
        </button>
      </SidebarContainer>
      <Routes>
        <Route path='/'element={<MainPage/>} />
        <Route path='/post'element={<PostPage/>} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/detail/:id' element={<DetailPage />} />
        <Route path='/edit/:id' element={<DetailPage />} />
      </Routes>
    </div>
  )
}