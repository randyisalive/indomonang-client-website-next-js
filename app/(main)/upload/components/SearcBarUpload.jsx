"use client";
import React, { useState } from "react";
import { Tooltip } from "primereact/tooltip";

const SearchBarUpload = ({ ref = "", handleRef = () => {} }) => {
  return (
    <>
      <div className="relative  flex items-center">
        <Tooltip target=".custom-target-icon" />

        <div className="flex left-0 absolute ms-3">
          <i className="pi pi-search text-[#919CA7]"></i>
        </div>
        <input
          data-pr-tooltip="Please enter your project reference number in the field"
          data-pr-position="right"
          type="text"
          name={"upload"}
          value={ref}
          onChange={(e) => handleRef(e)}
          placeholder="Reference Number"
          className="custom-target-icon py-[10px] px-[38px] text-[#919CA7] shadow  focus:border-blue-500 focus:outline-none w-[320px] rounded-[8px] border border-[#EAEAEA]"
        />
      </div>
    </>
  );
};

export default SearchBarUpload;
