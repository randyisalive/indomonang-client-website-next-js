"use client";
import useLoginData from "@/app/hooks/useLoginData";
import Link from "next/link";
import React, { useState } from "react";

const Form = ({
  title = "Input Form",
  type = "text",
  name = "default_input_name",
  placeholder = "default_placeholder",
  subtitle = "",
  subLink = "",
  onChange = () => {},
  value = "",
  disabled = false,
  className = {},
}) => {
  const [eye, setEye] = useState(false);
  const handleEye = () => {
    setEye(!eye);
  };
  return (
    <div className={`flex flex-col gap-[16px]  ${className}`}>
      <div className="flex  justify-between">
        <span className="text-sm " style={{ color: "#919CA7" }}>
          {title}
        </span>
        {subtitle != "" ? (
          <Link
            href={subLink}
            className=" text-[#9B1D24] font-[500] cursor-pointer text-sm hover:underline"
          >
            {subtitle}
          </Link>
        ) : null}
      </div>
      <div className="flex relative items-center">
        <input
          type={!eye ? type : "text"}
          name={name}
          className="p-3 text-sm w-full rounded-[8px] pt-[16px] pr-[14px] pb-[16px] pl-[14px] border border-[#D5D7DA] focus:outline-none focus:border-blue-600"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          disabled={disabled}
        />
        {type == "password" ? (
          <div className="absolute right-0 me-3">
            <i
              onClick={() => handleEye()}
              className={`pi ${
                !eye ? "pi-eye" : "pi-eye-slash"
              } cursor-pointer`}
            ></i>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Form;
