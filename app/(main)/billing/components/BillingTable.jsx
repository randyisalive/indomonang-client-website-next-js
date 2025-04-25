"use client";
import TableComponent from "@/app/components/ui/TableComponent";
import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { motion } from "framer-motion";
import { useBillingContext } from "../context/BillingContext";
import { useInvoiceContext } from "../../invoice/context/InvoiceContext";

const BillingTable = () => {
  const { invoice, isLoadingInvoice } = useInvoiceContext();
  const th_array = [
    "No",
    "No. Invoice",
    "Due Date",
    "Payment Terms",
    "Amount",
    "Status",
  ];
  const unpaid_invoice = invoice.data?.filter((item) =>
    ["Delivered", "Arrived to Client"].includes(item.status)
  );

  return (
    <div>
      {JSON.stringify(invoice)}
      {isLoadingInvoice === 1 ? (
        <div className="flex flex-col px-[64px]">
          <TableComponent
            th_array={th_array}
            datas={unpaid_invoice}
            TableType="invoice_bills"
            isLoading={isLoadingInvoice}
          />
        </div>
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
