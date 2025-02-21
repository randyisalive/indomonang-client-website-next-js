import React from "react";
import SupportNavbar from "./components/SupportNavbar";
import SupportFooter from "./components/SupportFooter";

const SupportLayout = ({ children }) => {
  return (
    <div className=" text-gray-800 font-medium">
      <SupportNavbar />
      <div className="px-20 container"> {children}</div>
    </div>
  );
};

export default SupportLayout;
