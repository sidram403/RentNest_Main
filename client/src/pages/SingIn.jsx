import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSucess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import { VscChecklist } from "react-icons/vsc";
import { MdContentPasteSearch } from "react-icons/md";
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { MdVerifiedUser } from "react-icons/md";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    // Auto play the video when the component mounts
    videoRef.current.play();

    // You may want to pause the video when the component unmounts
    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSucess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="hero min-h-screen bg-slate-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className=" hidden md:flex md:flex-col  lg:text-left">
          <h1 className="text-3xl font-bold text-black text-center">
            🔑 Unlock Your Dream Space with RentNest! 🔑
          </h1>
          <p className="py-6 text-slate-700 text-center text-1xl">
            Welcome to RentNest, your key to hassle-free housing in the vibrant
            city of Bangalore!
          </p>
          <h1 className="text-3xl font-bold text-black text-left mb-5">
            Why Join RentNest?
          </h1>
          <div className="flex gap-4 flex-wrap sm:flex-nowrap">
            <div className="card none rounded-lg text-neutral-content bg-neutral  w-52 md:inline ">
              <video
                ref={videoRef}
                width="600"
                height="360"
                controls
                muted
                loop
              >
                <source src="./public/aad-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="card none bg-neutral text-neutral-content md:inline w-40 hover:scale-105 transition-scale duration-300">
              <div className="card-body px-2 items-center text-center">
                <VscChecklist className="card-title w-16 h-16 hover:text-white font-semibold" />
                <p className="text-white">Extensive Listings</p>
              </div>
            </div>
            <div className="card none bg-neutral text-neutral-content md:inline w-40 hover:scale-105 transition-scale duration-300">
              <div className="card-body px-2 items-center text-center">
                <FaPersonWalkingLuggage className="card-title w-16 h-16 hover:text-white font-semibold" />
                <p className="text-white">Perfect Roommates</p>
              </div>
            </div>
            <div className="card none bg-neutral text-neutral-content w-40 md:inline hover:scale-105 transition-scale duration-300">
              <div className="card-body px-2 items-center text-center">
                <MdVerifiedUser className="card-title w-16 h-16 hover:text-white font-semibold" />
                <p className="text-white">Verified Properties</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card shrink-0 w-full max-w-md shadow-2xl bg-white">
          <form onSubmit={handleSubmit} className="card-body">
            <h1 className="text-4xl mb-5 font-bold text-black mx-auto">
              Login
            </h1>
            <div className="form-control p-3">
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered bg-transparent text-black"
                required
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="form-control p-3">
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered bg-transparent text-black"
                required
                id="password"
                onChange={handleChange}
              />
            </div>
            <div className="form-control my-6">
              <button
                disabled={loading}
                className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
            </div>
            <OAuth />
            <div className="flex gap-2 mx-auto my-5 text-black">
              <span>Dont have an account?</span>
              <Link to="/sign-up">
                <span className="text-blue-700">Sign Up</span>
              </Link>
            </div>
            {error && <p className="text-red-500 mt-1 mx-auto">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
