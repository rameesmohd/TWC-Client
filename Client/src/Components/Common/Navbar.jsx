import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/ClientSlice";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
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
  const [scrolled, setScrolled] = useState(false);
  const token = useSelector((state) => state.Client.token);
  const axiosInstance = userAxios();

  const signout = async () => {
    await axiosInstance.patch("/logout");
    dispatch(logout());
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const options = [
    { option: "Home", nav: "/" },
    { option: "Userpanel", nav: "/my-course" },
  ];

  return (
    <Header
      className={classNames(
        "!fixed !z-50 !h-auto !w-full !border-b !border-white/5 !bg-black/95 !px-0 backdrop-blur-lg transition-shadow duration-300",
        scrolled && "shadow-lg shadow-black/40"
      )}
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 sm:px-14">
        <Link to="/" className="flex items-center">
          <img src={img} alt="FourCapEdu" className="h-14 sm:h-16 w-auto object-cover" />
        </Link>

        <button
          onClick={toggleMobileMenu}
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none md:hidden"
        >
          <span className="sr-only">Open main menu</span>
          {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>

        <div
          className={classNames(
            "w-full transition-all md:block md:w-auto",
            isMobileMenuOpen ? "block" : "hidden"
          )}
          id="navbar-default"
        >
          <ul className="mt-4 flex flex-col gap-1 rounded-2xl bg-black/90 p-3 shadow-xl ring-1 ring-white/10 backdrop-blur-lg md:mt-0 md:flex-row md:items-center md:gap-2 md:bg-transparent md:p-0 md:shadow-none md:ring-0 md:backdrop-blur-none">
            {options.map((obj, index) => (
              <li key={index}>
                <Link
                  to={obj.nav}
                  className="block rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-lime-400"
                >
                  {obj.option}
                </Link>
              </li>
            ))}

            {token ? (
              <li>
                <button
                  onClick={signout}
                  className="w-full rounded-full border border-red-500/60 px-5 py-1.5 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/10 md:w-auto"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Drawer
                    btnText="Login"
                    btnClassname="rounded-full border border-white/30 bg-transparent text-white hover:border-lime-400 hover:text-lime-400 mx-1"
                    Body={<Loginform />}
                  />
                </li>
                <li>
                  <Drawer
                    btnText="Signup"
                    btnClassname="rounded-full border-none bg-lime-400 font-semibold text-black hover:bg-lime-300 mx-1"
                    Body={<Signupfrom />}
                  />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </Header>
  );
};

export default Navbar;