import React from 'react'

import Button from '../Common/Button'

import stillqueriesgif from '../../assets/query_dark_mode.cd5014b9.gif'
import mt4Img from '../../assets/metatrader4.png'
import mt5Img from '../../assets/mt5img.png'
import Collapse from '../../Components/Common/Collapse'
import Footer from '../Common/Footer'
import { RiWhatsappLine } from 'react-icons/ri'
import CourseSection from './CourseSection'
import CertificateSection from './CertificateSection'
import ReviewSections from './ReviewSections'

const Body = () => {
  return (
  <>
    <CourseSection/>
    <CertificateSection/>
    <ReviewSections/>

    <div className='my-12 px-16'>
      <div className='text-3xl my-4'>Frequenly asked questions</div>
      <Collapse/>
    </div>       

    <section className='grid grid-cols-2 '>
      <div className='col-span-1 bg-yellow-300'>
          <div className='  text-6xl text-center px-64 py-12'>
                Your Trading career growth just one click away.
          <div className='flex justify-center my-8 '>
              <Button className={'border p-2 bg-slate-200 text-sm rounded-lg px-8'} text={'Enroll course now'}/>
          </div>
          <p className='text-sm text-right'>100+ Students joined </p>
          </div>
      </div>
      <div className='col-span-1 bg-black py-12'>
            <div className='w-full text-6xl text-center px-36 text-white'>
              Still have any queries?
            </div>
            <div className='flex justify-center'>
            <img src={stillqueriesgif} className='h-72' alt="" />
            </div>
            <div className='w-full text-6xl text-center px-36 text-white'>
              We are here
            </div>
            <div className='text-white  text-center my-16 flex justify-center'> 
            <div className='bg-green-500 p-2 rounded-lg flex items-center'>
            <RiWhatsappLine/>
             <span className='mx-2 '>Whatsapp Now!</span> 
            </div>
            </div>
      </div>
    </section>

    <section className='container md:h-[500px] mx-auto animate-fade-up'>
            <div className='grid grid-cols-1 md:grid-cols-4 h-full gap-5 mt-2'>
                <div className='col-span-1 mr-1'></div>
                <a href='https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe?utm_source=www.metatrader4.com&utm_campaign=download'  className='col-span-1 mr-1  rounded-md flex flex-col justify-center text-center p-5 hover:scale-110 transition'> 
                        <h4 className='mb-5'>MetaTrader 4</h4>
                        <p className='mb-5'>The world’s most popular trading 
                            <br />platform</p>
                        <img  src={mt4Img} alt="" />
                </a>
                <a href='https://download.mql5.com/cdn/web/metaquotes.software.corp/mt4/mt4setup.exe?utm_source=www.metatrader4.com&utm_campaign=download' className='col-span-1 mr-1  rounded-md flex flex-col justify-center text-center p-5 hover:scale-110 transition'>
                        <h4 className='mb-5'>MetaTrader 5</h4>
                        <p className='mb-5'>Multi-asset trading on one 
                            <br />powerful platform</p>
                            <img className='' src={mt5Img} alt="" />
                </a>
                <div className='col-span-1 mr-1'></div>
            </div>
      </section>
    <Footer/>
    </>
  )
}

export default Body
