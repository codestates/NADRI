import React from 'react'
import styled from 'styled-components'
import { Routes, Route, useNavigate, Navigate, BrowserRouter, Link } from 'react-router-dom';

export default function Body () {
  return (
    <div>
      <Routes>
        <Route path='/'element={<MainPage/>} />
      </Routes>
    </div>
  )
}