import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from '../Pages/User/Signup'
import Login from '../Pages/User/Login'
import Home from '../Pages/User/Home'
import Mycourse from '../Pages/User/Mycourse'
import Classroom from '../Pages/User/Classroom'
import Checkout from '../Pages/User/Checkout'
import { useSelector } from 'react-redux'
import NotFoundPage from '../Pages/404'
import Resetpassword from '../Pages/User/Resetpassword'

const User = () => {
  const userAuth = useSelector((state) => state.Client.token)
  const PrivateRoute = ({ element, ...rest }) => {
    return userAuth ? element : <Navigate to="/login" />;
  };
  
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={userAuth? <Navigate to={'/home'}/> : <Login />} />
        <Route path="/resetpassword" element={<Resetpassword />}/>
        
        {/* Private */}
        <Route path='/my-course' element={<PrivateRoute element={<Mycourse/>}/>}/>
        <Route path='/checkout' element={<PrivateRoute element={<Checkout/>}/>} />
        <Route path='/chapter' element={<PrivateRoute element={<Classroom/>}/>}/>

         {/* 404 route */}
         <Route path='*' element={<NotFoundPage />}/>
    </Routes>
  )
}

export default User
