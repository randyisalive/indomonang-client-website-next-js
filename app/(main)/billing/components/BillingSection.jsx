"use client";
import NumberFlow from "@number-flow/react";
import React from "react";

const BillingSection = ({ data = [] }) => {
  const grand_total = data.reduce((acc, item) => {
    const cleanedStr = item[2051].replace(/[^0-9]/g, "");
    return acc + parseInt(cleanedStr);
  }, 0);
  return (
    <div className="w-full flex justify-center ">
      <div className="flex gap-2 flex-col ">
        <NumberFlow
          value={grand_total}
          className=" text-4xl"
          prefix="Rp. "
          suffix=" ,-"
        />
        <span className="text-center">Outstanding Balance</span>
      </div>
    </div>
  );
};

export default BillingSection;
