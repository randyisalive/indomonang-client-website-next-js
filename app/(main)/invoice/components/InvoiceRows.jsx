import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { Rating } from "primereact/rating";
import React from "react";
import { motion } from "framer-motion";

const InvoiceRows = ({
  item = {},
  num = 0,
  currentPage = 0,
  rowsPerPage = 10,
  role = "",
  rating = 0,
  handleRating = () => {},
}) => {
  return (
    <tr key={item.id}>
      <td className="border px-4 py-2 text-center">
        {num + 1 + (currentPage - 1) * rowsPerPage}
      </td>
      {role === "Admin" ? (
        <td className="border px-4 py-2">{item.company}</td>
      ) : null}
      <td className="border px-4 py-2 text-center">{item.ref_num}</td>
      <td className="border px-4 py-2 text-center">
        <StatusBadge
          title={item.status?.name}
          bg_color={item.status?.bg_color}
          font_color="white"
        />
      </td>
      <td className="border px-4 py-2 text-start">{item.service}</td>
      <td className="border px-4 py-2 text-center">{item.estimated_done}</td>
    </tr>
  );
};

export default InvoiceRows;
