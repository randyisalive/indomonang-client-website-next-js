import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import React from "react";
import { invoice_data, invoice_data_client } from "@/app/function/static_data";
import { useInvoiceContext } from "../context/InvoiceContext";
import Link from "next/link";
import { motion } from "framer-motion";

const InvoiceRows = ({
  item = {},
  num = 0,
  currentPage = 0,
  rowsPerPage = 10,
}) => {
  const status_invoice = invoice_data.filter((x) => x.text === item[1905]);
  const { handleDownloadInvoice } = useInvoiceContext();
  const payment_id = item[2839].split(" ").pop();
  const payment_array = payment_id.split(",");
  const transaction_array = item?.[2838].split(",");
  const payment_dates = item?.[2837].split(",");
  console.log(payment_dates);

  return (
    <tr key={item.id}>
      <td className="border px-4 py-2 text-center">
        {num + 1 + (currentPage - 1) * rowsPerPage}
      </td>
      <td className="border px-4 py-2 text-center ">
        <Link href={`/billing/${decodeURIComponent(item[1907])}`}>
          <span
            className=" w-fit text-blue-500 cursor-pointer hover:underline"
            //onClick={() => handleDownloadInvoice(item.id)}
          >
            {item[1907]}
          </span>
        </Link>
      </td>
      <td className="border px-4 py-2 text-center ">
        <ul>
          {transaction_array?.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </td>
      <td className="border px-4 py-2 text-center">
        {payment_dates[payment_dates?.length - 1]}
      </td>
      <td
        className={`border px-4 py-2 text-end ${
          item[1905] === "Closed" ? "text-green-600" : "text-red-600"
        }  font-bold`}
      >
        {item[2051]}
      </td>
    </tr>
  );
};

export default InvoiceRows;
