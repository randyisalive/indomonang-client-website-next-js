import React from "react";

const EnquityStatusData = () => {
  const enquiry_data = [
    { id: 0, text: "Open", bg_color: "#007BFF" },
    { id: 1, text: "Drafting", bg_color: "#FD7E14" },
    { id: 2, text: "Checking", bg_color: "#D39E00" },
    { id: 3, text: "Processing", bg_color: "#17A2B8" },
    { id: 4, text: "Finished", bg_color: "#28A745" },
    { id: 5, text: "Cancelled", bg_color: "#DC3545" },
  ];

  return { enquiry_data };
};

export default EnquityStatusData;
