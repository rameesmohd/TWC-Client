import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const token = useSelector((state) => state.Client.token);
  const axiosInstance = userAxios();

  const signout = async () => {
    setSigningOut(true);
    try {
      await axiosInstance.patch("/logout");
      dispatch(logout());
    } finally {
      setSigningOut(false);
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while the mobile menu overlays the page
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close on Escape
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const options = [
    { option: "Home", nav: "/" },
    { option: "Userpanel", nav: "/my-course" },
  ];

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-lime-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
      >
        Skip to content
      </a>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm motion-reduce:transition-none md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      <Header
        className={classNames(
          "!fixed !z-50 !h-auto !w-full !border-b !border-white/5 !bg-black/95 !px-0 backdrop-blur-lg transition-shadow duration-300 motion-reduce:transition-none",
          scrolled && "shadow-lg shadow-black/40"
        )}
      >
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4 pb-0 sm:px-14">
          <Link to="/" className={classNames("flex items-center rounded", focusRing)}>
            {/* <img src={img} alt="FourCapEdu" className="h-14 sm:h-20 w-auto object-cover" /> */}

            <div className="text-xl font-extrabold tracking-tight text-white">
              FourCap<span className="text-lime-400">Edu</span>
            </div>
          </Link>

          <button
            onClick={toggleMobileMenu}
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="navbar-default"
            aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
            className={classNames(
              "ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:hidden",
              focusRing
            )}
          >
            {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
          </button>

          <div
            className={classNames(
              "relative z-50 w-full transition-all md:block md:w-auto",
              isMobileMenuOpen ? "block" : "hidden"
            )}
            id="navbar-default"
          >
            <ul className="mt-4 flex flex-col gap-1 rounded-2xl bg-black/90 p-3 shadow-xl ring-1 ring-white/10 backdrop-blur-lg md:mt-0 md:flex-row md:items-center md:gap-2 md:bg-transparent md:p-0 md:shadow-none md:ring-0 md:backdrop-blur-none">
              {options.map((obj, index) => {
                const isActive = location.pathname === obj.nav;
                return (
                  <li key={index}>
                    <Link
                      to={obj.nav}
                      onClick={closeMobileMenu}
                      aria-current={isActive ? "page" : undefined}
                      className={classNames(
                        "block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        isActive ? "bg-white/10 text-lime-400" : "text-white/80 hover:bg-white/10 hover:text-lime-400",
                        focusRing
                      )}
                    >
                      {obj.option}
                    </Link>
                  </li>
                );
              })}

              {token ? (
                <li>
                  <button
                    onClick={signout}
                    disabled={signingOut}
                    className={classNames(
                      "w-full rounded-full border border-red-500/60 px-5 py-1.5 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto",
                      focusRing
                    )}
                  >
                    {signingOut ? "Logging out…" : "Logout"}
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
    </>
  );
};

export default Navbar;