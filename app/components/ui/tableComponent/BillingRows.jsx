import React from "react";
import StatusBadge from "./StatusBadge";
import { motion } from "framer-motion";

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
      <td className="border px-4 py-2 text-center">{item.ref_num}</td>
      <td className="border px-4 py-2 w-full flex items-center justify-center">
        <StatusBadge
          title={item.status_name}
          bg_color="#1062FE"
          font_color="white"
        />
      </td>
      <td className="border px-4 py-2">{item.date}</td>
      <td className="border px-4 py-2">{item.date_added}</td>
      <td className="border px-4 py-2">{item[2470]}</td>
      <td className="border px-4 py-2 text-center">
        <motion.span
          whileHover={{
            color: "#912534",
            textDecoration: "underline",
          }}
          className="cursor-pointer"
        >
          View Details
        </motion.span>
      </td>
    </tr>
  );
};

export default BillingRows;
