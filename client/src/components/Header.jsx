import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";

const Header = () => {
  const {currentUser} = useSelector(state => state.user);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <div className="logo__section w-28 sm:w-48">
            <img src="./logo.png" alt="img" />
          </div>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
              About
            </li>
          </Link>
          
          <Link to="/profile">
          {currentUser ? (
              <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="profile pic" />
          ) : (
            <li className="text-slate-700 hover:underline cursor-pointer">
            {" "}
            Sing in
          </li>
          )
          
        }
           
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
