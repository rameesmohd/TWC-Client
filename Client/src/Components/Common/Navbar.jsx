import React, { useState } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import img from '../../assets/01 (1).png'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {logout} from '../../Redux/ClientSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = useSelector((state)=>state.Client.token)

  const signout=()=>{
    dispatch(logout())
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const options = [
    {option: "My Course"},
    {option: "About"},
  ];

  return (
    <nav className="bg-white border-gray-200 shadow-xl fixed z-50 w-full px-4 pb-2">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-xl font-semibold whitespace-nowrap text-blue-800">
            <img src={img} alt="" className="w-32 h-20" />
          </span>
        </a>
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

        <div
          className={`w-full md:block md:w-auto transition ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-default">
          <ul className="font-medium md:flex flex-col p-4 md:p-0 mt-4 border items-center
           border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            { options.map((obj, index) => {
              return (
                <li key={index * 2}>
                  <Link
                    to={obj?.nav}
                    className="block py-2 px-3 text-gray-900 w-full rounded hover:bg-gray-100
                     md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                  >
                    {obj.option}
                  </Link>
                </li>
              );
            })}
            { token ?
            <li>
            <Button className={"px-2 py-2 sm:-mr-6 border cursor-pointer"} text={"Logout"} action={()=>signout()}/>
            </li> :
            <>
            <li>
            <Button className={"px-2 py-2 sm:-mr-6 border cursor-pointer"} text={"Login"} action={()=>navigate('/login')}/>
            </li>
            <li>
            <Button className={"px-4 py-2 bg-blue-500 border cursor-pointer"} text={"Signup"} action={()=>navigate('/signup')}/>
            </li>
            </> 
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;