import React from 'react'
import { FaPhoneSquareAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <>
    <div className='h-96 w-full grid grid-cols-5 bg-slate-50 '>
            <div className='col-span-1 bg-red-100 flex justify-center p-8'>
                <div>
                    <div className='flex '>
                        <FaPhoneSquareAlt className='text-xl'/>
                        <p>+91 8547822807</p>
                    </div>
                    <div className='flex '>
                        <FaPhoneSquareAlt />
                        <p>+91 8547822807</p>
                    </div>
                </div>
            </div>
    </div>
    </>
  )
}

export default Footer
