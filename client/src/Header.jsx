import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header = () => {
  const { user } = useContext(UserContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`${
          isScrolled ? "py-2 bg-bidBlack text-xl" : "py-3 bg-biGray text-xl"
        } fixed left-0 top-0 right-0 z-50 transition-all duration-300 flex justify-between items-center `}
      >
        <Link to="/" className="flex items-center">
          <span className={isScrolled ? "text-xl" : "text-3xl"}>&#129302;</span>{" "}
          DevCourse
        </Link>

        <div className="flex items-center">
          <Link to="/courses" className="p-2 border-r-2 border-white hover:text-gray-400 transition duration-200">
            Courses
          </Link>
          <Link to="/contact" className="p-2 border-r-2 border-white hover:text-gray-400 transition duration-200">
            Contact Us
          </Link>
          <Link to="/about" className="px-2 hover:text-gray-400 transition duration-200">
            About Us
          </Link>
        </div>

        <Link
          to="/profile"
          className="text-black bg-white flex gap-2 border border-white rounded-full px-4 py-3 items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>

          <div className="bg-white text-black rounded-full border border-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
          {!!user && <h1 className="text-xl">{user.name}</h1>}
        </Link>
      </header>

      {/* Apply margin-top to the main content */}
      <main className="mt-24">{/* Your content goes here */}</main>
    </>
  );
};

export default Header;
