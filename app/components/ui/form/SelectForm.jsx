import React from "react";

const SelectForm = ({
  title = "Input Form",
  name = "default_input_name",
  subtitle = "",
  onChange = () => {},
  disabled = false,
  className = {},
  children,
}) => {
  return (
    <div className={`flex flex-col gap-2 p-1 ${className}`}>
      <div className="flex w-full justify-between">
        <span className="text-sm text-gray-600">{title}</span>
        {subtitle != "" ? (
          <span className="text-blue-600 cursor-pointer text-sm hover:text-blue-700">
            {subtitle}
          </span>
        ) : null}
      </div>
      <div className="flex relative items-center">
        <select
          name={name}
          onChange={onChange}
          disabled={disabled}
          className="p-3 text-sm w-full  rounded-sm border focus:outline-none focus:border-blue-600"
        >
          {children}
        </select>
      </div>
    </div>
  );
};

export default SelectForm;
