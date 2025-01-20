import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import React from "react";
import { invoice_data } from "@/app/function/static_data";
import { useInvoiceContext } from "../context/InvoiceContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { useBillingContext } from "../../billing/context/BillingContext";

const InvoiceRows = ({
  item = {},
  num = 0,
  currentPage = 0,
  rowsPerPage = 10,
  role = "",
}) => {
  const status_invoice = invoice_data.filter((x) => x.text === item[1905]);
  const { handleDownloadInvoice } = useInvoiceContext();
  const payment_id = item[2839].split(" ").pop();
  const payment_array = payment_id.split(",");

  return (
    <tr key={item.id}>
      <td className="border px-4 py-2 text-center">
        {num + 1 + (currentPage - 1) * rowsPerPage}
      </td>
      <td className="border px-4 py-2 text-center ">
        <span
          className=" w-fit  cursor-pointer"
          onClick={() => handleDownloadInvoice(item.id)}
        >
          {item[1907]}
        </span>
      </td>
      <td className="border px-4 py-2 text-center ">
        <Link href={`/billing/${payment_array[0]}`}>
          <motion.span className="cursor-pointer hover:underline text-blue-600">
            {item[2838]}
          </motion.span>
        </Link>
      </td>

      <td className="border px-4 py-2 text-center">{item[2837]}</td>
      <td className="border px-4 py-2 text-end text-green-600 font-bold">
        {item[2051]}
      </td>
    </tr>
  );
};

export default InvoiceRows;
