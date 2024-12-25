import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCommon } from "../../customHooks/useCommon";

const Signup = () => {
  const {email,password,setEmail,setPassword} = useCommon();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success(`Account created Successfully!`, {
        position: "top-center",
        autoClose: 5000,
      });
      navigate('/');
    } catch (err) {
      // Handle specific error cases
      if (err.code === "auth/email-already-in-use") {
        toast.error(
          `This email is already registered. Please log in instead.`,
          {
            position: "top-center",
            autoClose: 5000,
          }
        );
      } else {
        toast.error(`Error signing up. Please try again.`, {
          position: "top-center",
          autoClose: 5000,
        });
        console.error("Signup error:", err);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-gradient">
      <ToastContainer />
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          SignUp
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
            className="w-full px-4 py-3 font-semibold text-white bg-button-color rounded-lg transition duration-300"
          >
            Signup
          </button>
        </form>
        <div className="w-[100%] text-center mt-4 mb-4">
          <a
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Already have an account? Sign in to continue!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
