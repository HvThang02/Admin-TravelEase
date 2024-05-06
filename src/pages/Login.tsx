import React, { useState } from "react";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../constants/routePaths";
import { admin_api_image, api } from "../constants/api";
import axios from "axios";

import logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("Capstone@123");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async (email, password) => {
    try {
      const response = await axios.post(`${api}/auth/login`, {
        email,
        password,
      });
      const { data } = response;
      localStorage.setItem("token", data.token);
      navigate(routePaths.APPROVE_HOTEL);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="h-screen w-screen bg-primary flex items-center justify-center">
      <div className="flex bg-white border-1 w-[160vh] h-[75vh]">
        <div className="flex flex-col justify-center items-center w-full">
          <img src={logo} className="w-[25vh] h-[25vh]" alt="Logo" />
        </div>

        <div className="border-r border-stroke border-[1px] border-solid"></div>
        <div className="flex flex-col justify-center items-center w-full">
          <p className="  font-bold text-3xl w-[60vh] ">Hello Admin</p>
          <form className=" flex flex-col w-[60vh] py-5 space-y-5">
            <div className="flex flex-col space-y-2 relative">
              <label htmlFor="email" className=" text-base">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="border-[1px] border-[#E2E8F0] p-2 px-4 rounded-md placeholder:text-sm placeholder:text-grey"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
              <MdOutlineEmail className="absolute right-3 bottom-1/2 top-1/2 text-grey" />
            </div>
            <div className="flex flex-col space-y-2 relative">
              <label htmlFor="password" className="text-base">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="border-[1px] border-[#E2E8F0] p-2 px-4 rounded-md placeholder:text-sm placeholder:text-grey"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <MdLockOutline className="absolute right-3 bottom-1/2 top-1/2 text-grey" />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <button
              type="button"
              className="bg-primary text-white py-3 rounded-md "
              onClick={() => {
                const email = (
                  document.getElementById("email") as HTMLInputElement
                ).value;
                const password = (
                  document.getElementById("password") as HTMLInputElement
                ).value;
                handleSignIn(email, password);
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
