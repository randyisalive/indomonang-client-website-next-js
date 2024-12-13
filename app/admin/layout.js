import React from "react";
import SettingSpan from "./account/components/SettingSpan";

const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="p-3 flex md:hidden justify-between">
        <div> navbar mobile</div>
        <div>
          <i className="pi pi-bars"></i>
        </div>
      </div>
      <div className="flex h-screen">
        <div className="w-1/3 hidden md:flex flex-col p-24 pe-0">
          <div className="flex flex-col gap-1 p-5 border-e-2 w-full">
            <SettingSpan />
            <ul className="flex flex-col gap-3 ms-5">
              <li className="border-4 rounded-full p-3 w-fit">
                Public profile
              </li>
              <li className="border-4 rounded-full p-3 w-fit">
                Account settings
              </li>
              <li className="border-4 rounded-full p-3 w-fit">Pro Account</li>
            </ul>
          </div>
        </div>
        <div className="w-full md:w-2/3 p-24">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
