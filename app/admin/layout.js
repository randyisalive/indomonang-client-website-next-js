import React from "react";
import SettingSpan from "./account/components/SettingSpan";

const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="p-3 flex md:hidden justify-between">
        <div> navbar mobile</div>
        <div>
          <i className="pi pi-bars text-xl"></i>
        </div>
      </div>
      <div className="flex h-screen">
        <div className="w-1/3 hidden md:flex flex-col p-24 pe-0">
          <div className="flex  sticky top-20 flex-col gap-1 p-5 border-e-2 w-full">
            <SettingSpan />
          </div>
        </div>
        <div className="w-full md:w-2/3 py-24  md:p-24">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
