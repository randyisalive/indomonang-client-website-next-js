import React from "react";
import NavbarItems from "./Navbar/NavbarItems";
import Link from "next/link";
import SmallNavbar from "./Navbar/SmallNavbar";
import AdminMessage from "./Admin/AdminMessage";
import Notification from "./Navbar/Notification";
import ProfileDropdown from "./Navbar/ProfileDropdown";

const Navbar = () => {
  return (
    <>
      <div id="navbar_section">
        <AdminMessage />
        <div className="flex flex-col gap-3 p-3 pb-0 border-b-2">
          <div className="flex flex-col w-full mx-auto  sm:px-6, lg:px-0 max-w-screen-xl">
            <div className="flex my-5 mb-10 justify-between w-full items-center ">
              <Link href={`/`}>
                <img
                  src="https://indomonangjadi.com/wp-content/uploads/2023/11/Logo-Default.png"
                  alt="sadas.jpg"
                  width={200}
                />
              </Link>
              <div className="flex gap-3 items-center ">
                <SmallNavbar />
              </div>
            </div>
            <div className="hidden sm:flex gap-3 items-center justify-between">
              <div className="w-full flex">
                <NavbarItems />
              </div>
              <div className="text-end w-3">
                <ProfileDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
