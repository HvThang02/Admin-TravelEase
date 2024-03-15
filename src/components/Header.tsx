import React from "react";
import logo from "../assets/logo.png";

export default function Header({ pageTitle }) {
  return (
    <div className="w-screen fixed z-20 flex items-center bg-white drop-shadow-md top-0 h-[75px]">
      <img src={logo} className="w-[10vh] mx-5" alt="logo" />
      <p className="text-primary text-[2vh]">{pageTitle}</p>
    </div>
  );
}
