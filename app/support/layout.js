import React from "react";
import SupportNavbar from "./components/SupportNavbar";

const SupportLayout = ({ children }) => {
  return (
    <div className=" text-gray-800 font-medium">
      <SupportNavbar />
      <div className=" container"> {children}</div>
    </div>
  );
};

export default SupportLayout;
