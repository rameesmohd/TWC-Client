import React from 'react'
import Navbar from '../../Components/Common/Navbar'
import Header from '../../Components/Home/Header'
import { Flex, Spin } from 'antd';
const Body = React.lazy(() => import('../../Components/Home/Mainbody'));

const Home = () => {
  return (
    <>
    <Navbar/>
    <img className='w-full h-full opacity-20 blur-sm absolute sm:-top-44' src="https://www.tailwindcss-animated.com/images/icons/wave.svg" alt="" />
    <div className='container mx-auto pt-16 sm:pt-28'>
      <Header/>
      <React.Suspense fallback={<Flex justify='center'><Spin size={'lg'}/></Flex>}>
        <Body />
      </React.Suspense>
    </div>
    </>
  )
}

export default Home
