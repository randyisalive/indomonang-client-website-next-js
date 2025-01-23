import NumberFlow from "@number-flow/react";
import React from "react";

const PaymentHistorySection = ({ data = [] }) => {
  const refund_total = data
    .filter((i) => i[1905] === "Canceled")
    .reduce((acc, item) => {
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

  const ppn_rp = data.reduce((acc, item) => {
    const cleanedStr = item[2049].replace(/[^0-9]/g, "");
    return acc + parseInt(cleanedStr);
  }, 0);
  const grand_total = data
    .filter((i) => i[1905] === "Closed")
    .reduce((acc, item) => {
      const cleanedStr = item[2051].replace(/[^0-9]/g, "");
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
    <div className="py-3 px-5 lg:px-0  w-full flex text-sm">
      <div className="w-1/3 justify-start flex">
        <div className="flex flex-col gap-2">
          <span className=" underline">Approve Payment </span>
          <NumberFlow
            value={grand_total}
            prefix="Rp. "
            suffix=" ,-"
            className="text-3xl font-bold text-green-500"
          />
          <div className="flex flex-col">
            <span>Avg. Apprpved Transaction</span>
            <NumberFlow
              value={avg_transaction_approved}
              prefix="Rp. "
              suffix=" ,-"
            />
          </div>
        </div>
      </div>
      <div className="w-1/3 justify-center items-center  flex">
        <div className="flex flex-col gap-2">
          <span className="underline">Highest Transaction </span>
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
          <span className=" underline">Refunds </span>
          <NumberFlow
            value={refund_total}
            prefix="Rp. "
            suffix=" ,-"
            className="text-3xl text-red-500"
          />{" "}
          <div className="flex flex-col">
            <span>Avg. Refunds Transaction</span>
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
