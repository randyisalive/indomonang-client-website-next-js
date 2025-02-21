"use client";
import React, { useState } from "react";

const SearchBarUpload = ({ ref = "", handleRef = () => {} }) => {
  return (
    <>
      <div className="relative lg:w-1/4 flex items-center">
        <div className="flex left-0 absolute ms-3">
          <i className="pi pi-search"></i>
        </div>
        <input
          type="text"
          name={"upload"}
          value={ref}
          onChange={(e) => handleRef(e)}
          placeholder="Reference Number"
          className="pl-10 py-2 border-2 focus:border-blue-500 focus:outline-none w-full"
        />
      </div>
    </>
  );
};

export default SearchBarUpload;
