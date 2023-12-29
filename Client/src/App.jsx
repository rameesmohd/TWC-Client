import { useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import UserRoutes from './Routes/User'
import AdminRoutes from './Routes/Admin'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/twc/admin/*" element={<AdminRoutes/>} />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
