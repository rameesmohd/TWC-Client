import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../Pages/User/Signup'
import Login from '../Pages/User/Login'
import Home from '../Pages/User/Home'

const User = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default User
