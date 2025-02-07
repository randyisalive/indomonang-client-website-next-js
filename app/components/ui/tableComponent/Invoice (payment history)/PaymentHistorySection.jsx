"use client";
import NumberFlow from "@number-flow/react";
import React from "react";

const PaymentHistorySection = ({ data = [] }) => {
  const refund_total = data
    .filter((i) => i[1905] === "Canceled")
    .reduce((acc, item) => {
      const cleanedStr = item[1932]?.replace(/[^0-9]/g, "");
      return acc + parseInt(cleanedStr);
    }, 0);

  const result_max = Math.max(
    ...data.map((item) => item[2051]?.replace(/[^0-9]/g, ""))
  );
  const result_min = Math.min(
    ...data.map((item) => item[2051]?.replace(/[^0-9]/g, ""))
  );

  const min_transaction = data.sort((a, b) => {
    const cleanedStrA = a[2051]?.replace(/[^0-9]/g, "");
    const cleanedStrB = b[2051]?.replace(/[^0-9]/g, "");
    const sorter = cleanedStrB - cleanedStrA;

    return sorter;
  });

  const grand_total = data
    .filter((i) => i[1905] === "Closed")
    .reduce((acc, item) => {
      const cleanedStr = item[2051]?.replace(/[^0-9]/g, "");
      return acc + parseInt(cleanedStr);
    }, 0);

  const approved_filtered = data.filter((i) => i[1905] === "Closed");
  const rejected_filtered = data.filter((i) => i[1905] === "Canceled");
  const avg_transaction_approved = (
    grand_total / approved_filtered.length
  ).toFixed(0);
  const avg_transaction_rejected = (
    refund_total / rejected_filtered.length
  ).toFixed(0);
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
