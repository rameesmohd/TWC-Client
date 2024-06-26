import React from 'react'
import CryptoWidget from '../Common/Cryptowidget'
import { Button } from 'antd'


const Header = () => {
  return (
    <>
        <div className='sm:grid grid-cols-2'>
            <div className='col-span-1 flex justify-center px-3 sm:px-0 pt-6 sm:pt-12 animate-fade-right'>
                <div className=''>
                <div className='text-5xl font-bold '>
                    Boost your<span className='text-lime-500 mx-2 font'>Trading Career,</span>
                    <br/>be a<span className='text-lime-500'> MONK </span> - ready now<span className='animate-pulse animate-infinite animate-duration-[700ms] animate-ease-linear'>!</span>
                </div>
                <br />
                <div className='text-lg '>
                    Our tutors will walk you through the different steps to make a trade profitable. <br />
                    With each trade being different, you have to understand how the market works
                    to select a performing trade. This is exactly what you will learn with FourCapedu.
                </div>
                <div className='flex my-8'>
                    <Button type='primary' className='bg-blue-500 text-white '>
                        <a href=" https://wa.me/917736833351 ">Lets talk!</a>
                    </Button>
                </div>
                </div>
            </div>
            <div className='col-span-1 animate-jump-in'>
                <img className='animate-bounce-img' 
                src="https://en.windsorbrokers.com/wp-content/uploads/2023/07/WBCopyTrading-news-hero-image.png" alt="" />
                {/* <img src={'https://img.freepik.com/free-vector/hand-drawn-stock-market-concept-with-analysts_23-2149163670.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703721600&semt=ais'} 
                className='animate-bounce-img ' alt="" /> */}
            </div>
        </div>
        <div className='z-30 my-4 sm:my-8 hidden sm:block'>
            <CryptoWidget/>
        </div>
    </>
  )
}

export default Header
