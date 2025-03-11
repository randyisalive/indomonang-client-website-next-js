import React from "react";

const PriorityBadge = ({ title = "", bg_color = "", font_color = "" }) => {
  return (
    <div
      style={{
        width: "125px",
        height: "25px",
        borderRadius: "16px",
        gap: "6px",
        color: font_color,
        backgroundColor: bg_color,
      }}
      className={`flex items-center justify-center text-sm `}
    >
      <div
        style={{
          width: "6px",
          height: "6px",
          color: font_color,
          backgroundColor: font_color,
          borderRadius: "16px",
        }}
        className="flex"
      ></div>
      {title}
    </div>
  );
};

export default PriorityBadge;
