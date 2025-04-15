"use client";
import React, { useState } from "react";

const SearchBarUpload = ({ ref = "", handleRef = () => {} }) => {
  return (
    <>
      <div className="relative  flex items-center">
        <div className="flex left-0 absolute ms-3">
          <i className="pi pi-search text-[#919CA7]"></i>
        </div>
        <input
          type="text"
          name={"upload"}
          value={ref}
          onChange={(e) => handleRef(e)}
          placeholder="Reference Number"
          className="py-[10px] px-[38px] text-[#919CA7] shadow  focus:border-blue-500 focus:outline-none w-[320px] rounded-[8px] border border-[#EAEAEA]"
        />
      </div>
    </>
  );
};

export default SearchBarUpload;
