"use client";
import TableComponent from "@/app/components/ui/TableComponent";
import React from "react";
import { useInvoiceContext } from "../context/InvoiceContext";

const InvoiceTables = () => {
  const { invoice } = useInvoiceContext();
  const th_array = [
    "No",
    "No. Invoice",
    "Status",
    "Due Date",
    "Payment Terms",
    "Amount",
  ];
  console.log(invoice);

  return (
    <div>
      <TableComponent th_array={th_array} datas={invoice} TableType="invoice" />
    </div>
  );
};

export default InvoiceTables;
