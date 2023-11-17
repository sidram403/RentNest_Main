import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSucess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

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
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSucess(data))
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message))

    }
  };
  return (
    <div className="hero  min-h-screen bg-slate-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center items-center flex flex-col lg:text-left">
      <h1 className="text-5xl font-bold text-black">Login now!</h1>
      <p className="py-6 text-slate-700 text-center">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card shrink-0 w-full max-w-md shadow-2xl bg-white">
      <form onSubmit={handleSubmit} className="card-body">
        <h1 className="text-4xl mb-5 font-bold text-black mx-auto">Login</h1>
        <div className="form-control p-3">
          
          <input type="email" placeholder="Email" className="input input-bordered bg-transparent text-black" required id="email" onChange={handleChange} />
        </div>
        <div className="form-control p-3">
          <input type="password" placeholder="Password" className="input input-bordered bg-transparent text-black" required id="password" onChange={handleChange} />
         
        </div>
        <div className="form-control my-6">
          <button  disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Sign In"}
          </button>
        </div>
        <OAuth/>
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
