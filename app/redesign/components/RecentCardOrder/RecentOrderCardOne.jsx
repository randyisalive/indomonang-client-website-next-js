import React from "react";
import Status from "../Status";
import PriorityBadge from "../PriorityBadge";

const RecentOrderCardOne = () => {
  return (
    <div
      className="flex flex-col text-sm w-full"
      style={{
        padding: "16px 12px",
        gap: "5px",
        border: "1px solid #EAEAEA",
        /* width: "867px", */
      }}
    >
      <div className="flex justify-between">
        <span className="font-bold">0UWUV</span>
        <div className=" flex gap-3" style={{ color: "#919CA7" }}>
          <Status title="Open" bg_color="bg-mainBlue" />
          <PriorityBadge
            title="Normal"
            bg_color="#E6FEF6"
            font_color="#28A745"
          />
        </div>
      </div>
      <div className="flex w-full" style={{ color: "#919CA7", gap: "8px" }}>
        <span style={{ width: "135px", height: "19px" }}>Service Name</span>
        <span style={{ width: "6px", height: "24px" }}>:</span>
        <span className="w-full font-bold text-black">
          APPROVAL DITJEN IMIGRASI (ALIH STATUS ITK - ITAS) (SPONSOR PERUSAHAAN)
        </span>
      </div>
      <div className="flex w-full" style={{ color: "#919CA7" }}>
        <span style={{ width: "135px", height: "19px" }}>4 February 2025</span>
        <span style={{ width: "6px", height: "24px" }}>14:33</span>
      </div>
    </div>
  );
};

export default RecentOrderCardOne;
