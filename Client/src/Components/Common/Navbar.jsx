import React, { useState } from "react";
import { Button, Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/ClientSlice";
import { MenuOutlined } from "@ant-design/icons";
import classNames from "classnames";
import Drawer from "./Drawer";
import Loginform from "../Loginform";
import Signupfrom from "../SignupCard";
import userAxios from "../../Axios/Useraxios";
import img from "../../assets/01 (1).png";

const { Header } = Layout;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = useSelector((state) => state.Client.token);
  const userId = useSelector((state) => state.Client.user_id);
  const axiosInstance = userAxios();

  const signout = async () => {
    await axiosInstance.patch("/logout", { id: userId });
    dispatch(logout());
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const options = [
    { option: "Home", nav: "/" },
    { option: "Userpanel", nav: "/my-course" },
  ];

  return (
    <>
      <Header className="bg-opacity-10 backdrop-blur-lg bg-black/10 border-gray-200 shadow-xl fixed z-50 w-full px-4 py-4 md:py-0">
        <div className="container mx-auto flex flex-wrap items-center justify-between sm:px-14">
          <Link to="/" className="flex items-center space-x-3">
            <img src={img} alt="logo" className="w-32 h-32 absolute -top-8" />
          </Link>

          <button
            onClick={toggleMobileMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
          >
            <span className="sr-only">Open main menu</span>
            <MenuOutlined className="text-xl" />
          </button>

          <div
            className={classNames(
              "w-full md:w-auto transition md:block",
              isMobileMenuOpen ? "block" : "hidden"
            )}
            id="navbar-default"
          >
            <ul className="font-medium md:flex flex-col md:flex-row p-4 md:p-0 mt-4 border items-center border-gray-100 rounded-lg md:space-x-8 md:mt-0 md:border-0">
              {options.map((obj, index) => (
                <li key={index}>
                  <Link
                    to={obj.nav}
                    className="block py-2 px-3 text-blue-800 w-full rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                  >
                    {obj.option}
                  </Link>
                </li>
              ))}

              {token ? (
                <li>
                  <Button
                    className="border border-red-700 text-red-700"
                    onClick={signout}
                  >
                    Logout
                  </Button>
                </li>
              ) : (
                <>
                  <li className="my-1">
                    <Drawer
                      btnText="Login"
                      btnClassname="bg-transparent border-blue-500 border"
                      Body={<Loginform />}
                    />
                  </li>
                  <li className="my-1">
                    <Drawer
                      btnText="Signup"
                      btnClassname="bg-blue-500 border text-white mx-1"
                      Body={<Signupfrom />}
                    />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </Header>
    </>
  );
};

export default Navbar;
