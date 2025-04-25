import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import React from "react";
import { useInvoiceContext } from "../../invoice/context/InvoiceContext";
import Status from "@/app/redesign/components/Status";

const InvoiceBillsRows = ({
  item = {},
  num = 0,
  currentPage = 0,
  rowsPerPage = 10,
  role = "",
}) => {
  const { handleDownloadInvoice } = useInvoiceContext();

  return (
    <tr
      key={item.id}
      className="odd:bg-[#F5F5F5] pt-[12px] pb-[12px] even:bg-white"
    >
      <td className="border px-4 py-2 text-center">
        {num + 1 + (currentPage - 1) * rowsPerPage}
      </td>
      <td className="border px-4 py-2 text-center ">
        <span
          className=" w-fit text-blue-500 cursor-pointer hover:underline"
          onClick={async () => {
            //  handleDownloadInvoice(item.id);
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/models/invoices/download`,
              {
                method: "POST",
                body: JSON.stringify({ invoice_id: item.id }),
              }
            );
            // Check if the response is a PDF
            const contentType = response.headers.get("Content-Type");
            const contentDis = response.headers.get("Content-Disposition");
            const filename = contentDis.split(";")[1];
            if (contentType === "application/pdf") {
              const blob = await response.blob();
              const url = URL.createObjectURL(blob);

              // Create a download link
              const a = document.createElement("a");
              a.href = url;
              a.download = contentDis; // Set the file name
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            } else {
              // Handle JSON response if needed
              const data = await response.json();
              console.log(data);
            }
          }}
        >
          {item.invoice_id}
        </span>
      </td>{" "}
      <td className="border px-4 py-2 text-center">{item.due_date}</td>{" "}
      <td className="border px-4 py-2 text-center">{item.payment_terms}</td>{" "}
      <td className="border px-4 py-2 text-end font-bold text-secondaryBlue">
        {item.amount}
      </td>
      <td className="border px-4 py-2 ">
        <div className="w-full flex justify-center">
          <Status
            title={"Waiting for Payment"}
            bg_color={"#FD7E14"}
            fit_content
            className="px-[12px] py-[4px]"
          />
        </div>
      </td>
    </tr>
  );
};

export default InvoiceBillsRows;
