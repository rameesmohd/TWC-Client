import React from 'react'
import Navbar from '../../Components/Common/Navbar'
import Header from '../../Components/Home/Header'
import Spinner from '../../Components/Common/Spinner'

const Body = React.lazy(() => import('../../Components/Home/Mainbody'));
const Home = () => {
  return (
    <>
    <Navbar/>
    <div className='container mx-auto pt-28'>
      <Header/>
      <React.Suspense fallback={<Spinner size={'lg'}/>}>
        <Body />
      </React.Suspense>
    </div>
    </>
  )
}

export default Home
