import React from 'react'
import Button from '../Common/Button'

const Mainbody = () => {
  
  
  return (
    <div className=' flex justify-center animate-fade-right'>
        <div className='my-8 sm:h-96'>
             <img className='h-72 ' src="https://img.freepik.com/free-vector/order-paying-contactless-payment-by-credit-card-order-basket-laptop-bank-card-male-online-customer-with-tablet-cartoon-character_335657-2563.jpg" alt="" />
             <p>My course cart is feeling pretty lonely.</p>
             <div className='flex justify-center mt-4 mb-2'>
                <Button text={'Purchase our course now'} className={'animate-bounce border bg-blue-500 text-white px-2 rounded-lg py-2 text-xs sm:text-sm cursor-pointer'}/>
             </div>
        </div>
    </div>
  )
}

export default Mainbody
