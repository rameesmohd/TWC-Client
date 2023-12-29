import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from '../Pages/Admin/Login'
import Users from '../Pages/Admin/Users'

const Admin = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/users' element={<Users/>}/>
    </Routes>
  )}

export default Admin
