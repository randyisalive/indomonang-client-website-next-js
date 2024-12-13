import React from "react";

const RadioButton = ({
  inputType = "checkbox" | "radio",
  name = "",
  title = "",
}) => {
  return (
    <div className="flex gap-2">
      <input
        type={inputType}
        name={name}
        className="border w-1 rounded-sm"
        value={true}
      />
      <span className="text-sm">{title}</span>
    </div>
  );
};

export default RadioButton;
