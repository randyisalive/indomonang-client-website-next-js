"use client";
import TableComponent from "@/app/components/ui/TableComponent";
import React from "react";
import useBillingData from "../hooks/useBillingData";
import JsonDisplay from "@/app/components/ui/JsonDisplay";

const BillingTable = () => {
  const { bills } = useBillingData();
  const th_array = [
    "No",
    "Transactions Number",
    "Date of Payment",
    "Amount of Payment",
    "Amount Paid",
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
      <JsonDisplay data={bills} />
      <TableComponent
        th_array={th_array}
        TableType="billing"
        datas={bills.billing_data}
        footer="billing"
      />
    </div>
  );
};

export default BillingTable;
