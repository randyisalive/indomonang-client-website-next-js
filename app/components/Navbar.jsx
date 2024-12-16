import React from "react";
import NavbarItems from "./Navbar/NavbarItems";
import Profile from "./Navbar/Profile";
import Link from "next/link";
import WebButton from "./ui/WebButton";
import DebugButton from "./Navbar/DebugButton";

const Navbar = () => {
  return (
    <div className="flex flex-col gap-3 p-3 pb-0 border-b-2">
      <div className="flex flex-col w-full mx-auto  sm:px-6, lg:px-0 max-w-screen-xl">
        <div className="flex justify-between w-full items-center mb-3">
          <Link href={`/`}>
            <img
              src="https://indomonangjadi.com/wp-content/uploads/2023/11/Logo-Default.png"
              alt="sadas.jpg"
              width={200}
            />
          </Link>
          <div className="flex gap-3 items-center">
            <DebugButton />
            <Profile />
          </div>
        </div>
        <div className="flex gap-3">
          <NavbarItems />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
