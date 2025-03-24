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
      <div
        id="navbar_section"
        className="bg-white border-b flex flex-col"
        style={{
          paddingLeft: "64px",
          paddingRight: "64px",
          paddingTop: "32px",
          paddingBottom: "16px",
          gap: "16px",
        }}
      >
        {/*  <AdminMessage /> */}
        <div className="flex justify-between w-full items-center ">
          <Link href={`/`} className=" flex items-center gap-3">
            <img
              src="/Property 1=JadiCRM.png"
              alt="logo.jpg"
              width={40}
              height={40}
            />
            <span className=" text-[20px] font-bold">JadiCRM</span>
          </Link>
          <div className="flex  items-center ">
            <SmallNavbar />
          </div>
        </div>
        <div className="hidden  sm:flex items-center justify-between w-full">
          <div className="w-full  flex" style={{ gap: "24px" }}>
            <NavbarItems />
          </div>
          <div className="flex items-center" style={{ gap: "12px" }}>
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
