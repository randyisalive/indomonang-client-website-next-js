"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import StatusBadge from "../StatusBadge";

const BillingRows = ({
  item = {},
  index = 0,
  currentPage = 0,
  rowsPerPage = 10,
}) => {
  return (
    <tr key={index}>
      <td className="border px-4 py-2 text-center">
        {index + 1 + (currentPage - 1) * rowsPerPage}
      </td>
      <td className="border px-4 py-2 text-center">
        <Link href={`/billing/${item.id}`}>
          <motion.span className="cursor-pointer hover:underline text-blue-600">
            {item.transactions_number}
          </motion.span>
        </Link>
      </td>
      <td className="border px-4 py-2 text-center">
        <div className=" flex justify-center">
          <StatusBadge
            title={item.payment_status?.text}
            bg_color={item.payment_status?.bg_color}
            font_color="white"
          />
          {console.log(item)}
        </div>
      </td>
      <td className="border px-4 py-2">
        <span className="font-bold">{item.invoices_id}</span>
      </td>
      <td className="border px-4 py-2 text-center">{item.date_of_payment}</td>
      <td className="border px-4 py-2 text-end text-green-600 w-2">
        {item.sub_total}
      </td>
      {/*  <td className="border px-4 py-2 text-end  text-blue-600">
        {item.amount_of_payment}
      </td> */}
      <td className="border px-4 py-2 text-end text-red-600">
        {item.outstanding_balance}
      </td>
    </tr>
  );
};

export default BillingRows;
