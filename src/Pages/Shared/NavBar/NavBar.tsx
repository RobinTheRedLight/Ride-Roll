import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  logout,
  selectCurrentUser,
} from "../../../redux/features/auth/authSlice";
import logo from "../../../assets/logo.svg";

const NavBar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = () => {
    dispatch(logout());
    window.location.reload();
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = (
    <>
      <li className="text-lg hover:text-gray-400">
        <Link to="/" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
      </li>
      <li className="text-lg hover:text-gray-400">
        <Link to="/bikes" onClick={() => setIsMenuOpen(false)}>
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
        <Link to="/about" onClick={() => setIsMenuOpen(false)}>
          About
        </Link>
      </li>
    </>
  );

  return (
    <nav className="bg-black text-white font-[Roboto] shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center font-[Oswald]">
          <img src={logo} alt="Logo" />
          <Link to="/" className="text-3xl">
            RIDE & ROLL
          </Link>
        </div>

        <ul className="hidden lg:flex space-x-6 items-center">{navLinks}</ul>

        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
            aria-label="Toggle Menu"
          >
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
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-black">
          <ul className="space-y-4 p-4">{navLinks}</ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
