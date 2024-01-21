import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from '../Pages/User/Signup'
import Login from '../Pages/User/Login'
import Home from '../Pages/User/Home'
import Mycourse from '../Pages/User/Mycourse'
import Classroom from '../Pages/User/Classroom'
import Checkout from '../Pages/User/Checkout'

const User = () => {
  return (
    <Routes>
        <Route path='/my-course' element={<Mycourse/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/chapter' element={<Classroom/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default User
