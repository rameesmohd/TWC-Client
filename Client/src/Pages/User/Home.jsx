import React from 'react'
import Navbar from '../../Components/Common/Navbar'
import Header from '../../Components/Home/Header'
const Body = React.lazy(() => import('../../Components/Home/Body'));

const Home = () => {
  return (
    <>
    <Navbar/>
    <div className='container mx-auto'>
      <Header/>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Body />
      </React.Suspense>
    </div>
    </>
  )
}

export default Home
