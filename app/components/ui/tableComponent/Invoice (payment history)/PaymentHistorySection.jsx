import NumberFlow from "@number-flow/react";
import React from "react";

const PaymentHistorySection = ({ data = [] }) => {
  const subTotal = data.reduce((acc, item) => {
    const cleanedStr = item[1932].replace(/[^0-9]/g, "");
    return acc + parseInt(cleanedStr);
  }, 0);
  const max_transaction = data.sort((a, b) => {
    const cleanedStrA = a[2051].replace(/[^0-9]/g, "");
    const cleanedStrB = b[2051].replace(/[^0-9]/g, "");
    const sorter = cleanedStrB - cleanedStrA;

    return sorter;
  });
  const result = max_transaction[0]?.[2051]?.replace(/[^0-9]/g, "");
  console.log(result);

  const ppn_rp = data.reduce((acc, item) => {
    const cleanedStr = item[2049].replace(/[^0-9]/g, "");
    return acc + parseInt(cleanedStr);
  }, 0);
  const grand_total = data.reduce((acc, item) => {
    const cleanedStr = item[2051].replace(/[^0-9]/g, "");
    return acc + parseInt(cleanedStr);
  }, 0);
  const avg_transaction = grand_total / data.length;
  return (
    <div className="py-3 px-5 lg:px-0  w-full flex text-sm">
      <div className="w-1/3 justify-start flex">
        <div className="flex flex-col gap-2">
          <span>Approve Payment </span>
          <NumberFlow
            value={grand_total}
            prefix="Rp. "
            suffix=" ,-"
            className="text-3xl"
          />
          <div className="flex flex-col">
            <span>Avg. Transaction</span>
            <NumberFlow value={avg_transaction} prefix="Rp. " suffix=" ,-" />
          </div>
        </div>
      </div>
      <div className="w-1/3 justify-center items-center  flex">
        <div className="flex flex-col gap-2">
          <span>Highest Transaction </span>
          <NumberFlow
            value={result}
            prefix="Rp. "
            suffix=" ,-"
            className="text-3xl"
          />
          <div className="flex flex-col">
            <span>Min. Transaction</span>
            <NumberFlow value={0} prefix="Rp. " suffix=" ,-" />
            <span>Total Transactions</span>
            <NumberFlow value={data.length} suffix=" Payments Occured" />
          </div>
        </div>
      </div>
      <div className="w-1/3 flex justify-end">
        <div className="flex flex-col gap-2">
          <span>Refunds </span>
          <NumberFlow
            value={0}
            prefix="Rp. "
            suffix=" ,-"
            className="text-3xl"
          />
          <div className="flex flex-col">
            <span>Avg. Transaction</span>
            <NumberFlow value={0} prefix="Rp. " suffix=" ,-" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistorySection;
