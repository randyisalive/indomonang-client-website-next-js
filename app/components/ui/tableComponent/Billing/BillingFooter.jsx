"use";
import React from "react";

const BillingFooter = ({ currentRows = [] }) => {
  // Filter rows to remove duplicates based on invoices
  const filteredRowsOutstanding = currentRows.reduce((acc, item) => {
    if (item.payment_status?.text === "Open") {
      const existingIndex = acc.findIndex((t) => t.invoices === item.invoices);
      if (existingIndex !== -1) {
        // Replace the existing item with the latest one
        acc[existingIndex] = item;
      } else {
        // Add the new item
        acc.push(item);
      }
    }
    return acc;
  }, []);

  const filteredRowsAmountPayment = currentRows.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.invoices === item.invoices)
  );
  const open_status = currentRows.filter(
    (item) => item.payment_status?.text === "Open"
  );

  // Calculate total amount of payment
  const total_amount_payment = filteredRowsAmountPayment.reduce(
    (accumulator, item) => {
      return accumulator + parseInt(item.amount_of_payment_int);
    },
    0
  );

  // Calculate total outstanding balance
  const total_outstanding_balance = filteredRowsOutstanding.reduce(
    (accumulator, item, index, array) => {
      if (item.payment_status?.text === "Rejected") {
        return accumulator;
      }

      const previousItemValue =
        index > 0 ? parseInt(array[index - 1].outstanding_balance_int) : 0;
      const currentValue = parseInt(item.outstanding_balance_int);

      // Adjust the calculation to ensure correct accumulation
      return accumulator + currentValue;
    },
    0
  );

  return (
    <>
      <tr>
        <td colSpan={6} className="text-end border px-4 py-2"></td>
        {/*  <td className="border px-4 py-2 text-end font-bold text-blue-600">
          Rp. {`${total_amount_payment.toLocaleString("id-ID")}`} ,-
        </td> */}
        <td className="border px-4 py-2 text-end font-bold text-red-600">
          Rp. {`${total_outstanding_balance.toLocaleString("id-ID")}`} ,-
        </td>
      </tr>
    </>
  );
};

export default BillingFooter;
