import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Login from '../Pages/Admin/Login'
import Users from '../Pages/Admin/Users'
import Sales from '../Pages/Admin/Sales'
import Course from '../Pages/Admin/Course'

const Admin = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/sales' element={<Sales/>}/>
        <Route path='/course' element={<Course/>}/>
    </Routes>
  )}

export default Admin
