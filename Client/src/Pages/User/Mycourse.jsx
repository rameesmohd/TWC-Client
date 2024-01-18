import React from 'react'
import Navbar from '../../Components/Common/Navbar'
import Mainbody from '../../Components/Mycourse/Mainbody'
import Footer from '../../Components/Common/Footer'

const Mycourse = () => {
  return (
    <>
      <Navbar/>
      <div className='container mx-auto pt-28'>
        <Mainbody/>
        <Footer/>
      </div>
    </>
  )
}

export default Mycourse
