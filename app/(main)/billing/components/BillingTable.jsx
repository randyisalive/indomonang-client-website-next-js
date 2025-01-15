"use client";
import TableComponent from "@/app/components/ui/TableComponent";
import React from "react";
import useBillingData from "../hooks/useBillingData";
import JsonDisplay from "@/app/components/ui/JsonDisplay";
import { ProgressSpinner } from "primereact/progressspinner";
import { motion } from "framer-motion";
import { useBillingContext } from "../context/BillingContext";

const BillingTable = () => {
  const { bills, isLoading } = useBillingContext();
  const th_array = [
    "No",
    "Transactions Number",
    "Status",
    "Invoice ID",
    "Date of Payment",
    "Sub Total",
    "Amount Need To Be Paid",
    "Outstanding Payment",
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
