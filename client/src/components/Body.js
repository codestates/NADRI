import React from 'react'
import styled from 'styled-components'
import MainPage from '../Pages/MainPage';
import PostPage from '../Pages/PostPage/PostPage'
import MyPage from '../Pages/MyPage';
import DetailPage from '../Pages/DetailPage';
import EditPage from '../Pages/EditPage/EditPage';
import { Routes, Route, useNavigate, Navigate, BrowserRouter, Link, Switch } from 'react-router-dom';

export default function Body () {
  return (
    <div>
      <Routes>
        <Route path='/'element={<MainPage/>} />
        <Route path='/post'element={<PostPage/>} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/detail/:id' element={<DetailPage />} />
        <Route path='/edit/:id' element={<EditPage />} />
      </Routes>
    </div>
  )
}