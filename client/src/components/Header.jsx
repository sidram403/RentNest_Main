import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className=" ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <div className="logo__section w-28 sm:w-48">
            <img src="./logo.png" alt="img" />
          </div>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search your location..."
            className="bg-transparent text-black focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-black" />
          </button>
        </form>
        <div className="flex gap-4">
          <Link to="/" className="hidden md:inline">
            <button
              type="button"
              className="p-2 px-5 border rounded-lg uppercase hover:bg-white hover:text-black transition ease-in-out delay-150"
            >
              Home
            </button>
          </Link>
          {currentUser && (
            <Link to="/create-listing" className="none md:inline">
              <button
                type="button"
                className="uppercase hidden md:inline p-2 px-5 border rounded-lg hover:bg-white hover:text-black transition ease-in-out delay-150"
              >
                List Property
              </button>
            </Link>
          )}

          <Link to="/profile">
            {currentUser ? (
              <div className="avatar ">
              <div className="w-11 h-11 rounded-full ring ring-white ring-offset-base-100 ring-offset-0">
                <img src={currentUser.avatar} />
              </div>
            </div>
              // <img
              //   className="rounded-full h-10 w-10 object-cover"
              //   src={currentUser.avatar}
              //   alt="profile pic"
              // />
            ) : (
              <button className="uppercase p-2 px-5 border rounded-lg hover:bg-white hover:text-black transition ease-in-out delay-150 ">
                {" "}
                Sing in
              </button>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
