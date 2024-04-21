import React from "react";
import { MdOutlineEmail, MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { routePaths } from "../constants/routePaths";
import { admin_api_image, api } from "../constants/api";

const logo = admin_api_image + "/logo.png";

export default function Login() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate(routePaths.APPROVE_HOTEL);
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
              />
              <MdLockOutline className="absolute right-3 bottom-1/2 top-1/2 text-grey" />
            </div>
            <button
              type="submit"
              className="bg-primary text-white py-3 rounded-md "
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
