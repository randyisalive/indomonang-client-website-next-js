import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import React from "react";
import { useInvoiceContext } from "../../invoice/context/InvoiceContext";

const InvoiceBillsRows = ({
  item = {},
  num = 0,
  currentPage = 0,
  rowsPerPage = 10,
  role = "",
}) => {
  const { handleDownloadInvoice } = useInvoiceContext();
  console.log(item);
  return (
    <tr key={item.id}>
      <td className="border px-4 py-2 text-center">
        {num + 1 + (currentPage - 1) * rowsPerPage}
      </td>
      <td className="border px-4 py-2 text-center ">
        <span
          className=" w-fit text-blue-500 cursor-pointer hover:underline"
          onClick={() => handleDownloadInvoice(item.id)}
        >
          {item.invoice_id}
        </span>
      </td>
      <td className="border px-4 py-2 ">
        <div className="w-full flex justify-center">
          <StatusBadge
            title={"Unpaid"}
            bg_color={"#EAD94C"}
            font_color="white"
          />
        </div>
      </td>
      <td className="border px-4 py-2 text-center">{item.due_date}</td>
      <td className="border px-4 py-2 text-center">{item.payment_terms}</td>
      <td className="border px-4 py-2 text-end font-bold text-secondaryBlue">
        {item.amount}
      </td>
    </tr>
  );
};

export default InvoiceBillsRows;
