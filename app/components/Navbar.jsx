import React from "react";
import NavbarItems from "./Navbar/NavbarItems";
import Link from "next/link";
import SmallNavbar from "./Navbar/SmallNavbar";
import logo from "../../public/jadicrm.png";
import ProfileDropdown from "./Navbar/ProfileDropdown";
import Image from "next/image";

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
        <div className="flex justify-between w-full items-center ">
          <Link href={`/`} className=" flex items-center gap-3">
            <Image src={logo} alt="logo.jpg" width={40} height={40} />

            <span className=" text-[20px] font-bold text-[#FBBF24]">
              JadiCRM
            </span>
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
