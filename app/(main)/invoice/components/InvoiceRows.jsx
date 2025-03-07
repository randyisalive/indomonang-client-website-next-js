import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import React from "react";
import { invoice_data, invoice_data_client } from "@/app/function/static_data";
import { useInvoiceContext } from "../context/InvoiceContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDecryptionContext } from "@/app/Context/DecryptionContext";
import { encryptMessage } from "@/app/function/decryptor";

const InvoiceRows = ({
  item = {},
  num = 0,
  currentPage = 0,
  rowsPerPage = 10,
}) => {
  const transaction_array = item?.transactions?.split(",");
  const payment_dates = item?.payment_dates?.split(",");

  const { decKey } = useDecryptionContext();

  return (
    <tr key={item.id}>
      <td className="border px-4 py-2 text-center">
        {num + 1 + (currentPage - 1) * rowsPerPage}
      </td>
      <td className="border px-4 py-2 text-center ">
        <Link
          href={`/billing/${encodeURIComponent(
            encryptMessage(item.invoice_id, decKey)
          )}`}
        >
          <span
            className=" w-fit text-blue-500 cursor-pointer hover:underline"
            //onClick={() => handleDownloadInvoice(item.id)}
          >
            {item.invoice_id}
          </span>
        </Link>
      </td>
      <td className="border px-4 py-2 text-center ">
        {console.log(item)}
        {item.status === "Closed" && (
          <StatusBadge
            title="Paid"
            bg_color="#BFC9CA"
            font_color="white"
            className="w-full"
          />
        )}
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
          item.status === "Closed" ? "text-green-600" : "text-red-600"
        }  font-bold`}
      >
        {item.amount}
      </td>
    </tr>
  );
};

export default InvoiceRows;
