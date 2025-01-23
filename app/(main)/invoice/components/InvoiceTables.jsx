"use client";
import TableComponent from "@/app/components/ui/TableComponent";
import React from "react";
import { useInvoiceContext } from "../context/InvoiceContext";

const InvoiceTables = () => {
  const { invoice } = useInvoiceContext();
  const th_array = [
    "No",
    "No. Invoice",
    "Transaction ID",
    "Status",
    "Date of Payment",
    "Amount",
  ];

  const payment_history_data = invoice.filter((item) =>
    ["Closed", "Canceled"].includes(item[1905])
  );

  return (
    <div>
      <TableComponent
        th_array={th_array}
        datas={payment_history_data}
        TableType="invoice"
      />
    </div>
  );
};

export default InvoiceTables;
