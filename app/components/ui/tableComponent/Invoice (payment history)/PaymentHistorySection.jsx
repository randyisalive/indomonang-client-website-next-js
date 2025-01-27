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
    <div className="py-3 px-5 lg:px-0 gap-5 lg:gap-0  w-full flex flex-col lg:flex-row text-sm">
      <div className="lg:w-1/3 lg:justify-start flex  justify-center">
        <div className="flex flex-col gap-2 items-center lg:items-start">
          <span className=" underline text-xs lg:text-base">
            Approve Payment
          </span>
          <NumberFlow
            value={grand_total}
            prefix="Rp. "
            suffix=" ,-"
            className="lg:text-3xl text-xl font-bold text-green-500"
          />
          <div className="flex flex-col text-xs lg:text-base">
            <span>Avg. Transaction</span>
            <NumberFlow
              value={avg_transaction_approved}
              prefix="Rp. "
              suffix=" ,-"
            />
          </div>
        </div>
      </div>
      <div className="lg:w-1/3 justify-center items-center  flex">
        <div className="flex flex-col gap-2 items-center ">
          <span className="underline text-xs lg:text-base">
            Highest Transaction
          </span>
          <NumberFlow
            value={result_max}
            prefix="Rp. "
            suffix=" ,-"
            className="lg:text-3xl text-xl font-bold"
          />
          <div className="flex flex-col text-xs lg:text-base">
            <span>Min. Transaction</span>
            <span>Rp. {result_min.toLocaleString("id-ID")} ,-</span>
          </div>
        </div>
      </div>
      <div className="lg:w-1/3   flex lg:justify-end justify-center ">
        <div className="flex flex-col items-center lg:items-start gap-2">
          <span className="underline text-xs lg:text-base">Refunds </span>
          <NumberFlow
            value={refund_total}
            prefix="Rp. "
            suffix=" ,-"
            className="lg:text-3xl text-xl text-red-500 font-bold"
          />
          <div className="flex flex-col text-xs lg:text-base">
            <span>Avg. Transaction</span>
            <NumberFlow
              value={avg_transaction_rejected}
              prefix="Rp. "
              suffix=" ,-"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistorySection;
