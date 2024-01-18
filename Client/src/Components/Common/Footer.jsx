import React from 'react'
// import footericon from '../../assets/01 (1).png'
import { Link, useNavigate } from 'react-router-dom'
import {AiFillPhone} from 'react-icons/ai'
import {FiMail} from 'react-icons/fi'
import {RiHomeOfficeFill} from 'react-icons/ri'
import ScrollToTopButton from './Scrolltotop'

const Footer = () => {
  const navigate =  useNavigate()
  return (
    <div className='z-20 border-t bg-slate-50 pt-2'>
        <div className='w-full h-auto py-3  grid grid-cols-1 md:grid-cols-3 gap-2 z-20 ' >
                <div className='space-x-1 px-10 md:px-20 lg:px-40'>
                    <ul>
                        <h3 className='font-bold' >NAVIGATIONS</h3>
                        <li className='my-2 '>
                            <a href='/'>Homepage</a>
                        </li>
                        <li className='my-2 '>
                        <a ></a></li>
                        <li className='my-2 '>
                        <a >About Course</a>
                        </li>
                        <li className='my-2 '>
                        <a > My Courses</a>
                        </li>
                    </ul>
                </div>
                <div className='space-x-1 px-10 md:px-20 lg:px-40'>
                <ul>
                        <h3 className='font-bold'>USEFUL LINKS</h3>
                        <li className='my-2 underline '>
                        <a  href='https://www.metatrader4.com/en' target="_blank" >Metatrader.com</a>
                        </li>
                        <li className='my-2 underline'>
                        <a href='https://www.forexfactory.com/' target="_blank" >ForexFactory.com</a>
                        </li>
                        <li className='my-2 underline'>
                        <a href='https://www.investing.com/' target="_blank" >Investing.com</a>
                        </li>
                        <li className='my-2 underline' target="_blank">
                            <a href="https://coinmarketcap.com/" target="_blank">coinmarketcap.com</a>
                        </li>
                    </ul>
                </div>
                <div className='space-x-1 px-10 md:px-20 lg:px-40'>
                <ul>
                    <h3 className='font-bold' >CONTACT</h3>
                    <li className='my-2 flex item-center'>
                        <RiHomeOfficeFill className='text-1xl mt-2 md:text-2xl'/>
                        <p className='mx-2'>city tower,baby hospital,Ernamkulam, 94126</p>
                    </li>
                    <li className='my-2 flex item-center'><AiFillPhone className='mt-1'/><p className='mx-2'>+ 01 234 567 88</p></li>
                    <li className='my-2 flex item-center underline'><FiMail className='mt-1'/><p className='mx-2'>tradewalker@gmail.com</p></li>
                    </ul>
                </div>          
        </div>
        <div className='w-auto h-auto bg-white flex justify-center mt-5'>
            {/* <img className='w-44 h-20' src={footericon} alt="" /> */}
            <div className='text-sm '>Trade Walker & Co.</div>
        </div>
        <div className='w-auto h-auto flex justify-center text-center text-gray-500 md:text-xs my-2'>
            <p className=' mx-3'>Terms</p>
            <p className='mx-3'>Policy</p>
        </div>
        <ScrollToTopButton/>
    </div> 
)}

export default Footer