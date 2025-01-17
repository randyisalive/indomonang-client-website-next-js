"use client";
import TableComponent from "@/app/components/ui/TableComponent";
import React from "react";
import useBillingData from "../hooks/useBillingData";
import JsonDisplay from "@/app/components/ui/JsonDisplay";
import { ProgressSpinner } from "primereact/progressspinner";
import { motion } from "framer-motion";
import { useBillingContext } from "../context/BillingContext";
import { useInvoiceContext } from "../../invoice/context/InvoiceContext";

const BillingTable = () => {
  const { bills, isLoading } = useBillingContext();
  const { invoice } = useInvoiceContext();
  const th_array = [
    "No",
    "No. Invoice",
    "Status",
    "Due Date",
    "Payment Terms",
    "Amount",
  ];
  const unpaid_invoice = invoice.filter((item) =>
    ["Approved", "Delivered", "Arrived to Client"].includes(item[1905])
  );

  return (
    <div>
      <JsonDisplay data={bills} />
      {isLoading === 1 ? (
        <TableComponent
          th_array={th_array}
          datas={unpaid_invoice}
          TableType="invoice_bills"
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
