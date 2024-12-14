import React from "react";

const EnquityStatusData = () => {
  const enquiry_data = [
    { id: 559, name: "Open", bg_color: "#00C49A" },
    { id: 560, name: "Drafting", bg_color: "#3F612D" },
    { id: 561, name: "Checking", bg_color: "#8D80AD" },
    { id: 562, name: "Processing", bg_color: "#192bc2" },
    { id: 563, name: "Finished", bg_color: "#BFC9CA" },
    { id: 564, name: "Cancelled", bg_color: "#B6244F" },
  ];

  return { enquiry_data };
};

export default EnquityStatusData;
