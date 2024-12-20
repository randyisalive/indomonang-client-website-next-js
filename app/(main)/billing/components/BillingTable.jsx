"use client";
import TableComponent from "@/app/components/ui/TableComponent";
import React from "react";
import useBillingData from "../hooks/useBillingData";
import JsonDisplay from "@/app/components/ui/JsonDisplay";
import { ProgressSpinner } from "primereact/progressspinner";
import { motion } from "framer-motion";

const BillingTable = () => {
  const { bills, isLoading } = useBillingData();
  const th_array = [
    "No",
    "Transactions Number",
    "Date of Payment",
    "Amount of Payment",
    "Amount Paid",
    "Action",
  ];

  return (
    <div>
      <JsonDisplay data={bills} />
      {isLoading === 1 ? (
        <TableComponent
          th_array={th_array}
          TableType="billing"
          datas={bills.billing_data}
          footer="billing"
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="  p-10 flex justify-center items-center"
        >
          <ProgressSpinner />
        </motion.div>
      )}
    </div>
  );
};

export default BillingTable;
