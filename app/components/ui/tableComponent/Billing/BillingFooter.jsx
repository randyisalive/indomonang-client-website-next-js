"use";
import React from "react";

const BillingFooter = ({ currentRows = [] }) => {
  const total_amount_payment = currentRows.reduce((accumulator, item) => {
    return accumulator + parseInt(item.amount_of_payment_int);
  }, 0);
  const total_outstanding_balance = currentRows.reduce((accumulator, item) => {
    return accumulator + parseInt(item.outstanding_balance_int);
  }, 0);
  return (
    <>
      <tr>
        <td colSpan={3} className="text-end border px-4 py-2"></td>
        <td className="border px-4 py-2 text-end font-bold text-blue-600">
          Rp. {`${total_amount_payment.toLocaleString("id-ID")}`} ,-
        </td>
        <td className="border px-4 py-2 text-end font-bold text-red-600">
          Rp. {`${total_outstanding_balance.toLocaleString("id-ID")}`} ,-
        </td>
        <td className="border px-4 py-2 bg-gray-100"></td>
      </tr>
    </>
  );
};

export default BillingFooter;
