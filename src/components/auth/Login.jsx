import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig/firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useCommon } from "../../customHooks/useCommon";

const Login = () => {
  const {email,password,setEmail,setPassword} = useCommon();

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success(`Login Successfully!`, {
        position: 'top-center',
        autoClose: 5000,
      });
      navigate('/');
    } catch (err) {
      console.log(err)
      toast.error(`Error LoginIn. Please try again.`, {
        position: 'top-center', 
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-gradient">
      <ToastContainer />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border rounded-lg outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border rounded-lg outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-white bg-button-color transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="w-[100%] text-center mt-2">
          <a
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Don't have an account? Let's get you signed up!
          </a>
        </div>
        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
