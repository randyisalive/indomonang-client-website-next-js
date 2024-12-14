import React from "react";
import StatusBadge from "./StatusBadge";
import { motion } from "framer-motion";

const WORows = ({ item = {}, num = 0, currentPage = 0, rowsPerPage = 10 }) => {
  console.log(item);
  return (
    <>
      <tr key={item.id}>
        <td className="border px-4 py-2 text-center">
          {num + 1 + (currentPage - 1) * rowsPerPage}
        </td>
        <td className="border px-4 py-2 text-center">{item.ref_num}</td>
        <td className="border px-4 py-2 w-full flex items-center justify-center">
          <StatusBadge
            title={item.status.name}
            bg_color={item.status.bg_color}
            font_color="white"
          />
        </td>
        <td className="border px-4 py-2">{item.service}</td>
        <td className="border px-4 py-2 text-center">{item.estimated_done}</td>
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
    </>
  );
};

export default WORows;
