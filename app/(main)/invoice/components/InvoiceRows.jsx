import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import React from "react";
import { invoice_data } from "@/app/function/static_data";
import { useInvoiceContext } from "../context/InvoiceContext";

const InvoiceRows = ({
  item = {},
  num = 0,
  currentPage = 0,
  rowsPerPage = 10,
  role = "",
}) => {
  const status_invoice = invoice_data.filter((x) => x.text === item[1905]);
  const { handleDownloadInvoice } = useInvoiceContext();

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
          {item[1907]}
        </span>
      </td>
      <td className="border px-4 py-2 ">
        <StatusBadge
          title={item[1905]}
          bg_color={status_invoice[0].bg_color}
          font_color="white"
        />
      </td>
      <td className="border px-4 py-2 text-center">{item[1914]}</td>
      <td className="border px-4 py-2 text-center">{item[1913]}</td>
      <td className="border px-4 py-2">
        <table className="table text-xs w-full">
          <tbody>
            <tr className="border-b">
              <td className=" font-bold">Sub Total:</td>
              <td className=" text-red-600">{item[1932]}</td>
            </tr>
            <tr className="border-b">
              <td className=" font-bold">PPN (Rp. / %):</td>
              <td className=" text-blue-600">
                {item[2047]} / {item[2049]}
              </td>
            </tr>{" "}
            <tr className="border-b">
              <td className=" font-bold">Grand Total</td>
              <td className=" text-green-600">{item[2051]}</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};

export default InvoiceRows;
