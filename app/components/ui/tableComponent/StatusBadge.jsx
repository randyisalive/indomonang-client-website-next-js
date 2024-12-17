import React from "react";

const StatusBadge = ({ title = "", bg_color = "", font_color = "" }) => {
  return (
    <div
      className="px-3 py-1 font-bold rounded-xl w-fit shadow-md"
      style={{ backgroundColor: bg_color, color: font_color }}
    >
      {title}
    </div>
  );
};

export default StatusBadge;
