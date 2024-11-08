import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  logout,
  selectCurrentUser,
} from "../../../redux/features/auth/authSlice";
import { motion } from "framer-motion";
import logo from "../../../assets/logo.svg";
import video from "../../../assets/Home/video.mp4";
import { fadeUp } from "../../../Animation/constant";
import { Link, useNavigate } from "react-router-dom";

const NavBarHero = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "customLight"
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/home/bikes?search=${searchTerm}`);
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleTheme = (e: any) =>
    setTheme(e.target.checked ? "customDark" : "customLight");
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogOut = () => {
    dispatch(logout());
    localStorage.clear();
    window.location.reload();
    setIsMenuOpen(false);
  };
  const navLinks = (
    <>
      <li className="text-lg hover:text-gray-400">
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
      </li>
      <li className="text-lg hover:text-gray-400">
        <Link to="/home/bikes" onClick={() => setIsMenuOpen(false)}>
          Bikes
        </Link>
      </li>
      {user ? (
        <>
          <li className="text-lg hover:text-gray-400">
            <Link to="/dashboard/profile" onClick={() => setIsMenuOpen(false)}>
              Dashboard
            </Link>
          </li>
          <li className="text-lg hover:text-gray-400">
            <button onClick={handleLogOut} className="focus:outline-none">
              Logout
            </button>
          </li>
        </>
      ) : (
        <li className="text-lg hover:text-gray-400">
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>
            Login
          </Link>
        </li>
      )}
      <li className="text-lg hover:text-gray-400">
        <Link to="/home/contact" onClick={() => setIsMenuOpen(false)}>
          Contact Us
        </Link>
      </li>
      <li className="text-lg hover:text-gray-400">
        <Link to="/home/about" onClick={() => setIsMenuOpen(false)}>
          About
        </Link>
      </li>
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          onChange={toggleTheme}
          checked={theme !== "customLight"}
        />
        <svg
          className="swap-on h-8 w-10 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          {/* Sun Icon */}
          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
        </svg>
        <svg
          className="swap-off h-8 w-10 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          {/* Moon Icon */}
          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
        </svg>
      </label>

      {/* Call to Action Button */}
      <Link className="block" to="/home/bikes">
        <button className="inline-flex items-center bg-primary  border-0 py-1 px-3 focus:outline-none rounded text-primary-content ">
          Book a Ride!
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </Link>
    </>
  );

  return (
    <div className="relative w-full h-[80vh] font-[Roboto]">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* Navbar */}
      <nav className="relative z-10 text-white w-full">
        <div className="container mx-auto flex justify-between items-center ">
          <div className="flex items-center font-[Oswald]">
            <img
              src={logo}
              alt="Logo"
              onClick={() => (window.location.href = "/")}
              className="cursor-pointer w-20"
            />
            <Link to="/" className="text-2xl ml-0 py-4">
              RIDE & ROLL
            </Link>
          </div>
          <ul className="hidden lg:flex space-x-6 items-center">{navLinks}</ul>
          <button onClick={toggleMenu} className="lg:hidden focus:outline-none">
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-16 6h16"
                />
              </svg>
            )}
          </button>
        </div>
        {isMenuOpen && (
          <div className="lg:hidden">
            <ul className="space-y-4 p-4 bg-base-100 text-base-content">
              {navLinks}
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Content */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className={`relative z-10 flex flex-col items-center justify-center h-[60vh] text-center px-4 ${
          isMenuOpen ? "hidden" : "block"
        }`}
      >
        <h1 className="text-4xl md:text-5xl mb-4 font-[Oswald] text-[#D9D9D9]">
          Explore the World on Two Wheels
        </h1>
        <p className="text-lg md:text-3xl mb-8 font-[Oswald] text-[#D9D9D9]">
          Find your perfect ride today!
        </p>

        <div className="flex items-center justify-center ">
          <div className="rounded-lg  shadow-lg w-full max-w-lg lg:max-w-xl">
            <div className="flex">
              {/* Search Icon */}
              <div className="flex w-12 lg:w-14 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-300 bg-white p-3 lg:p-4">
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="w-6 lg:w-7 fill-gray-500"
                >
                  <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z" />
                </svg>
              </div>

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search bike availability..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white pl-4 py-3 lg:py-3.5 text-base lg:text-lg font-semibold outline-none rounded-none"
              />

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="bg-primary px-5 py-3 lg:px-6 lg:py-3.5 rounded-tr-lg rounded-br-lg text-white font-semibold text-base lg:text-lg hover:bg-primary-dark transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NavBarHero;
