"use client";
import TableComponent from "@/app/components/ui/TableComponent";
import React from "react";
import useInvoiceData from "../hooks/useInvoiceData";

const InvoiceTables = () => {
  const { invoice } = useInvoiceData();
  const th_array = [
    "No",
    "Reference Number",
    "Status",
    "Date of Payment",
    "Amount of Payment",
    "Outstanding Balance",
    "Action",
  ];
  const td_array = [
    {
      id: 0,
      ref_num: "2DCGE",
      status_name: "Open",
      date: "Monday",
      payment: "Rp. 10.000 -,",
      outstanding: "Rp. 50.000 -,",
    },
  ];
  return (
    <div>
      <TableComponent th_array={th_array} datas={invoice} TableType="invoice" />
    </div>
  );
};

export default InvoiceTables;
