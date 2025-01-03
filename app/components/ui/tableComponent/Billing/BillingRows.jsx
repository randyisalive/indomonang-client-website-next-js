"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BTOA, ATOB } from "@/app/function/decryptor";

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
        {item.transactions_number}
      </td>

      <td className="border px-4 py-2 text-center">{item.date_of_payment}</td>
      <td className="border px-4 py-2 text-end  text-blue-600">
        {item.amount_of_payment}
      </td>
      <td className="border px-4 py-2 text-end text-red-600">
        {item.outstanding_balance}
      </td>

      <td className="border px-4 py-2 text-center">
        <Link href={`/billing/${item.id}`}>
          <motion.span
            whileHover={{
              color: "#912534",
              textDecoration: "underline",
            }}
            className="cursor-pointer"
          >
            View Details
          </motion.span>
        </Link>
      </td>
    </tr>
  );
};

export default BillingRows;
