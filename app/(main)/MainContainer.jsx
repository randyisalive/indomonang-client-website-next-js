import React from "react";

const MainContainer = ({ children }) => {
  return (
    <div className="flex flex-col w-full mx-auto pt-7  sm:px-6, lg:px-0 max-w-screen-xl">
      {children}
    </div>
  );
};

export default MainContainer;
