import React from 'react'
import Navbar from '../Components/Common/Navbar'
import Header from '../Components/Home/Header'
import Body from '../Components/Home/Body'

const Home = () => {
  return (
    <>
    <Navbar/>
    <div className='container mx-auto'>
      <Header/>
      <Body/>
    </div>
    </>
  )
}

export default Home
