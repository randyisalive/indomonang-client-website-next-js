"use client";
import NumberFlow from "@number-flow/react";
import Image from "next/image";
import React from "react";
import wallet from "../../../../public/solar_wallet-money-bold-duotone.png";

const BillingSection = ({ data = [] }) => {
  const grand_total = data.reduce((acc, item) => {
    const cleanedStr = item.amount?.replace(/[^0-9]/g, "");
    return acc + parseInt(cleanedStr);
  }, 0);
  return (
    <div className="w-full flex items-center ">
      <div className=" flex relative  shadow overflow-y-clip rounded-[12px] h-[129px] bg-gradient-to-b from-[#FFFFFF] to-[#FFF8F9] min-w-[320px]">
        <div className=" rounded-tl-[12px] rounded-bl-[12px] flex h-full bg-gradient-to-r from-[#9B1D24] to-[#F75F68] w-[8px] absolute left-0  "></div>
        <div className="px-[24px] py-[32px]  flex gap-[5px] flex-col">
          <span className="text-[16px] text-[#919CA7] font-semibold">
            Outstanding Balance
          </span>
          <NumberFlow
            value={150000000}
            className=" text-[28px] font-bold"
            prefix="Rp. "
            suffix=" ,-"
          />
        </div>
        <div className=" absolute overflow-clip right-0 top-[16px]">
          <Image src={wallet} width={115} height={115} alt="wallet billing" />
        </div>
      </div>
    </div>
  );
};

export default BillingSection;
