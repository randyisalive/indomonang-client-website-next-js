import React from "react";

const RecentOrderCardTwo = () => {
  return (
    <div
      className="flex flex-col relative"
      style={{
        padding: "16px 12px",
        gap: "10px",
        border: "1px solid #EAEAEA",
      }}
    >
      <div
        className=" absolute mb-10 left-0"
        style={{ width: "60px", height: "30px" }}
      >
        <div
          className=" absolute text-xs right-full flex"
          style={{ width: "5px", height: "4px", borderTopLeftRadius: "2px" }}
        >
          &nbsp;
        </div>
        <div
          className=" text-white absolute right-full h-6/7"
          style={{
            backgroundColor: "#C4161C",
            borderRadius: "",
            width: "5px",
          }}
        ></div>
        <div
          className=" text-white text-center text-xs"
          style={{
            backgroundColor: "#C4161C",
            borderRadius: "0px 4px 4px 0px",
            padding: "6px 12px",
            width: "60px",
            height: "26px",
          }}
        >
          Open
        </div>
      </div>
      <div className="flex justify-between" style={{ marginTop: "48px" }}>
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

export default RecentOrderCardTwo;
