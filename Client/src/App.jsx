import { useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import UserRoutes from './Routes/User'
import AdminRoutes from './Routes/Admin'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <BrowserRouter>
      <div><Toaster
       position="top-center"
       reverseOrder={false}
      /></div>
      <Routes>
        <Route path="/twc/admin/*" element={<AdminRoutes/>} />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
