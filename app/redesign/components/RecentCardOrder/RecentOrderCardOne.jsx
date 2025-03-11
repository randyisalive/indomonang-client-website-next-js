import React from "react";

const RecentOrderCardOne = () => {
  return (
    <div
      className="flex flex-col text-sm"
      style={{ padding: "16px 12px", gap: "10px", border: "1px solid #EAEAEA" }}
    >
      <div className="flex justify-between">
        <span className="font-bold">0UWUV</span>
        <div className=" flex gap-3" style={{ color: "#919CA7" }}>
          <span>4 February 2025</span>
          <span>14:33</span>
        </div>
      </div>
      <div className="flex w-full" style={{ color: "#919CA7", gap: "8px" }}>
        <span style={{ width: "135px", height: "19px" }}>Service Name</span>
        <span style={{ width: "6px", height: "24px" }}>:</span>
        <span className="w-full font-bold text-black">
          APPROVAL DITJEN IMIGRASI (ALIH STATUS ITK - ITAS) (SPONSOR PERUSAHAAN)
        </span>
      </div>
      <div className="flex w-full" style={{ color: "#919CA7", gap: "8px" }}>
        <span style={{ width: "135px", height: "19px" }}>Status</span>
        <span style={{ width: "6px", height: "24px" }}>:</span>
        <span className="w-full font-bold text-black"></span>
      </div>
      <div className="flex w-full" style={{ color: "#919CA7", gap: "8px" }}>
        <span style={{ width: "135px", height: "19px" }}>Priority</span>
        <span style={{ width: "6px", height: "24px" }}>:</span>
        <span className="w-full font-bold text-black"></span>
      </div>
    </div>
  );
};

export default RecentOrderCardOne;
