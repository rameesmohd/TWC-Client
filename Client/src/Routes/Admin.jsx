import React from 'react'
import { Route,Routes,Navigate } from 'react-router-dom'
import Login from '../Pages/Admin/Login'
import Users from '../Pages/Admin/Users'
import Sales from '../Pages/Admin/Sales'
import Course from '../Pages/Admin/Course'
import { useSelector } from 'react-redux'
import NotFoundPage from '../Pages/404'

const Admin = () => {
  const adminAuth = useSelector((state) => state.Admin.token)
  const PrivateRoute = ({ element, ...rest }) => {
    return adminAuth ? element : <Navigate to="/twc/admin/login" />;
  };
  return (
    <Routes>
        <Route path='/login' element={adminAuth? <Navigate to={'/twc/admin'}/> : <Login />}/>

        {/* Private */}
        <Route path='/users' element={<PrivateRoute element={<Users/>}/>}/>
        <Route path='/sales' element={<PrivateRoute element={<Sales/>}/>}/>
        <Route path='/course' element={<PrivateRoute element={<Course/>}/>}/>
        <Route path='/' element={<PrivateRoute element={<Users/>}/>}/>

         {/* 404 route */}
        <Route path='*' element={<NotFoundPage />}/>
    </Routes>
  )}

export default Admin
