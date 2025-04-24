"use client";
import NumberFlow from "@number-flow/react";
import React from "react";

const BillingSection = ({ data = [] }) => {
  const grand_total = data.reduce((acc, item) => {
    const cleanedStr = item.amount.replace(/[^0-9]/g, "");
    return acc + parseInt(cleanedStr);
  }, 0);
  return (
    <div className="w-full flex items-center  px-[64px]">
      <div className=" flex relative  shadow rounded-[12px] h-[129px] bg-gradient-to-b from-[#FFFFFF] to-[#FFF8F9] min-w-[320px]">
        <div className=" rounded-tl-[12px] rounded-bl-[12px] flex h-full bg-gradient-to-r from-[#9B1D24] to-[#F75F68] w-[8px] absolute left-0  "></div>
        <div className="px-[24px] py-[32px]  flex gap-[12px] flex-col">
          <span className="text-[16px] text-[#919CA7] font-semibold">
            Outstanding Balance
          </span>
          <NumberFlow
            value={150000000}
            className=" text-[28px] font-bold"
            prefix="Rp. "
            suffix=" ,-"
          />
          <div></div>
        </div>
      </div>

      <span className="text-center">Outstanding Balance</span>
    </div>
  );
};

export default BillingSection;
