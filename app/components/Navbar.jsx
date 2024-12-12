import React from "react";
import NavbarItems from "./Navbar/NavbarItems";

const Navbar = () => {
  return (
    <div className="flex flex-col gap-3 p-5 pb-0 border-b-2">
      <div className="flex flex-col w-full mx-auto  sm:px-6, lg:px-0 max-w-screen-xl">
        <div className="flex justify-between w-full">
          <div>
            <img src="as" alt="sadas.jpg" />
          </div>
          <div>asd</div>
        </div>
        <div className="flex gap-3">
          <NavbarItems />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
