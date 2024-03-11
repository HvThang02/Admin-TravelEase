import React from "react";

const ActionButton = ({ Icon, buttonText, onClick }) => (
  <div
    className="flex items-center space-x-2 hover:text-primary cursor-pointer"
    onClick={onClick}
  >
    <Icon className="w-[3vh] h-[3vh]" />
    <p className="">{buttonText}</p>
  </div>
);

export default ActionButton;
