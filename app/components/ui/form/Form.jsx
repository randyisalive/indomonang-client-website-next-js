"use client";
import useLoginData from "@/app/hooks/useLoginData";
import React, { useState } from "react";

const Form = ({
  title = "Input Form",
  type = "text",
  name = "default_input_name",
  placeholder = "default_placeholder",
  subtitle = "",
  onChange = () => {},
  value = "",
  disabled = false,
}) => {
  const [eye, setEye] = useState(false);
  const handleEye = () => {
    setEye(!eye);
  };
  return (
    <div className="flex flex-col gap-2 p-1">
      <div className="flex w-full justify-between">
        <span className="text-sm text-gray-600">{title}</span>
        {subtitle != "" ? (
          <span className="text-blue-600 cursor-pointer text-sm hover:text-blue-700">
            {subtitle}
          </span>
        ) : null}
      </div>
      <div className="flex relative items-center">
        <input
          type={!eye ? type : "text"}
          name={name}
          className="p-3 text-sm w-full  rounded-sm border focus:outline-none focus:border-blue-400"
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
