import React from "react";

export default function Header({ pageTitle }) {
  return (
    <div className="w-screen fixed z-10 flex items-center bg-white drop-shadow-md top-0 h-[75px]">
      <p className="text-primary text-[2vh]">{pageTitle}</p>
    </div>
  );
}
