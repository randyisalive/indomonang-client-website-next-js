import React from "react";

const Status = ({ title = "", bg_color = "", fit_content = false }) => {
  return (
    <div
      style={
        !fit_content
          ? {
              width: "100px",
              height: "25px",
              borderRadius: "16px",
            }
          : { borderRadius: "16px", height: "25px", width: "fit-content" }
      }
      className={`flex font-sans items-center justify-center ${bg_color}  text-sm text-white`}
    >
      {title}
    </div>
  );
};

export default Status;
