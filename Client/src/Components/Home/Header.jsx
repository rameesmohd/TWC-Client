import React from 'react'
import headerImag from '../../assets/about.jpg'
import CryptoWidget from '../Common/Cryptowidget'

const Header = () => {
  return (
    <>
        <div className='grid grid-cols-2 h-[500px] pt-28 '>
            <div className='col-span-1 flex justify-center pt-12'>
                <div className='pl-16'>
                <div className='text-5xl font-bold'>
                    Boost your 
                    <span className='text-blue-500 mx-2'>Trading Career,</span><br />
                    be a<span className='text-blue-500'> MONK </span> 
                    ready now!
                </div>
                <br />
                <div className='text-base'>
                Our tutors will walk you through the different steps to make a trade profitable. <br />
                With each trade being different, you have to

                understand how the market works

                to select a performing trade. This is exactly what you will

                learn with Trade House.
                </div>
                <div className='flex my-8'>
                    <div onClick={''} className='bg-blue-500 rounded-lg text-white p-2 flex cursor-pointer'>
                        Enroll for the course now
                    </div>
                    <div className='mx-2 rounded-lg text-black p-2 flex border cursor-pointer'>
                        Contact us
                    </div>
                </div>
                </div>
            </div>
            <div className='col-span-1 '>
                <img 
                src={'https://img.freepik.com/free-vector/hand-drawn-stock-market-concept-with-analysts_23-2149163670.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703721600&semt=ais'} className='animate-bounce-img ' alt="" />
            </div>
            </div>
        <div className='z-30 my-8'>
            <CryptoWidget/>
        </div>
    </>
  )
}

export default Header
