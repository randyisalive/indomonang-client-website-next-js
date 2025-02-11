"use client";
import NumberFlow from "@number-flow/react";
import React from "react";

const PaymentHistorySection = ({ data = [] }) => {
  const grand_total = data
    .filter((i) => i.status === "Closed")
    .reduce((acc, item) => {
      const cleanedStr = item.amount?.replace(/[^0-9]/g, "");
      return acc + parseInt(cleanedStr);
    }, 0);

  return (
    <div className="py-3 px-5 lg:px-0 gap-5 lg:gap-0  w-full flex flex-col lg:flex-row text-sm justify-center">
      <div className="lg:w-1/3 justify-center flex items-center">
        <div className="w-full flex justify-center ">
          <div className="flex gap-2 flex-col ">
            <NumberFlow
              value={grand_total}
              className=" text-4xl"
              prefix="Rp. "
              suffix=" ,-"
            />
            <span className="text-center text-lg">Total Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistorySection;
