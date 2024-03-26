import React, { useState } from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import img from '../../assets/01 (1).png'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {logout} from '../../Redux/ClientSlice'
import Drawer from './Drawer'
import Loginform from '../Loginform'
import Signupfrom from '../SignupCard'
import userAxios from "../../Axios/Useraxios";

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = useSelector((state)=>state.Client.token)
  const userId = useSelector((state)=>state.Client.user_id)
  const axiosInstance = userAxios()

  const signout=async()=>{
    await axiosInstance.patch('/logout',{id : userId})
    dispatch(logout())
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const options = [
    {option: "Home",nav : '/'},
    {option: "Userpanel",nav : '/my-course'},
  ];

  return (
    <>
    <nav className="bg-opacity-10 backdrop-blur-lg bg-black/10 border-gray-200 shadow-xl fixed z-50 w-full px-4 py-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
        <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-blue-800">
            <img src={img} alt="" className="w-32 h-32 absolute -top-8" />
          </span>
        </Link>
        <button
          onClick={toggleMobileMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm 
          text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className={`w-full md:block md:w-auto transition ${isMobileMenuOpen ? "block" : "hidden"}`} id="navbar-default">
          <ul className="font-medium md:flex flex-col p-4 md:p-0 mt-4 border items-center border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            {options.map((obj, index) => (
              <li key={index}>
                <Link
                  to={obj?.nav}
                  className="block py-2 px-3 text-blue-800 w-full rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  {obj.option}
                </Link>
              </li>
            ))}
            {token ? (
              <>
              <li>
                <Button className="border border-red-700 text-red-700 " onClick={signout}>Logout</Button>
              </li>
              </>
            ) : (
              <>
                <li>
                  <Drawer btnText={'Login'} 
                  btnClassname={'bg-transparent border-blue-500 border my-1 '}
                  Body={<Loginform/>}
                  />
                   <Drawer btnText={'Signup'} 
                  btnClassname={'bg-blue-500 border text-white mx-1 my-1 '}
                  Body={<Signupfrom/>}
                  />
                </li> 
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;

