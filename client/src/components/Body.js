import React from 'react'
import styled from 'styled-components'
import MainPage from '../Pages/MainPage';
import PostPage from '../Pages/PostPage'
import MyPage from '../Pages/MyPage';
import { Routes, Route, useNavigate, Navigate, BrowserRouter, Link } from 'react-router-dom';

export default function Body () {
  return (
    <div>
      <Routes>
        <Route path='/'element={<MainPage/>} />
        <Route path='/post'element={<PostPage/>} />
        <Route path='/mypage' element={<MyPage />} />
      </Routes>
    </div>
  )
}