import React from "react";
import WebButton from "../ui/WebButton";

const HomeList = () => {
  return (
    <div className="flex flex-col gap-4 text-xs">
      <span className="font-bold">Contacts</span>
      <div className="flex gap-3 items-center">
        <i className="pi pi-user"></i>
        <span className="text-gray-500">No Contacts Found</span>
      </div>
      <div className="w-full">
        <WebButton title="New Contact.." className={`text-xs`} />
      </div>
    </div>
  );
};

export default HomeList;
