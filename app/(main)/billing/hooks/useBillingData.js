"use client";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import api from "@/app/api/api";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import React, { useEffect, useState } from "react";

const useBillingData = () => {
  // api
  const { InvoiceApi, PaymentApi, WOApi, CustomerAccountApi } = api();
  const { getAccountById } = CustomerAccountApi();
  const { getWoByUserId } = WOApi();
  const { getInvoiceByWo } = InvoiceApi();
  const { getPaymentByNoInvoice, getPaymentAll } = PaymentApi();

  // dec key
  const { accounts, role } = useAccountDataContext();

  // get data
  const [bills, setBills] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const getData = async () => {
    try {
      if (accounts.id != null) {
        const bill_status = [
          { id: 0, text: "Paid in Full", bg_color: "#8BC34A" },
          { id: 1, text: "Paid Partially", bg_color: "#F44336" },
        ];
        const payment_status = [
          { id: 0, text: "Open", bg_color: "#00C49A" },
          { id: 1, text: "Waiting for Approval", bg_color: "#F8F4A6" },
          { id: 2, text: "Rejected", bg_color: "#F44336" },
          { id: 3, text: "Closed", bg_color: "#BFC9CA" },
          { id: 4, text: "Approve", bg_color: "#008BF8" },
        ];

        if (role === "Admin") {
          const billing_data = await getPaymentAll();

          const datas = billing_data.map((item) => {
            return {
              id: item.id,
              transactions_number: item[2143],
              payment_status: payment_status.filter(
                (x) => x.text === item[1956]
              )[0],
              status_name: bill_status.filter((x) => x.text === item[2213])[0],
              date_of_payment: item[1954],
              sub_total: item[1959],
              amount_of_payment: item[2211],
              outstanding_balance: item[2216],
              amount_of_payment_int: item[2139] ? item[2139] : 0,
              outstanding_balance_int: item[2212] ? item[2212] : 0,
              invoices: item["1960_db_value"],
              invoices_id: item[1960],
            };
          });

          setBills({
            billing_data: datas,
          });
          setIsLoading(1);
          return;
        }
        const user_data = await getAccountById(accounts.id);
        const wo_data = await getWoByUserId(user_data[0]["2630_db_value"]);
        const wo_array = wo_data.map((item) => {
          return item.id;
        });
        if (wo_array.length > 0) {
          const invoice_data = await getInvoiceByWo(wo_array.join(","));
          const invoice_ids = invoice_data.map((item) => item.id);
          const billing_data = await getPaymentByNoInvoice(
            invoice_ids.join(",")
          );

          const datas = billing_data.map((item) => {
            return {
              id: item.id,
              transactions_number: item[2143],
              payment_status: payment_status.filter(
                (x) => x.text === item[1956]
              )[0],
              status_name: bill_status.filter((x) => x.text === item[2213])[0],
              date_of_payment: item[1954],
              sub_total: item[1959],
              amount_of_payment: item[2211],
              outstanding_balance: item[2216],
              amount_of_payment_int: item[2139] ? item[2139] : 0,
              outstanding_balance_int: item[2212] ? item[2212] : 0,
              invoices: item["1960_db_value"],
              invoices_id: item[1960],
            };
          });
          /*   const outstanding_totals = billing_data.reduce(
            (acc, item) => acc + item[2212],
            0
          ); */
          setBills({
            billing_data: datas,
          });
        }
        setIsLoading(1);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, [accounts.id, role]);
  return { bills, isLoading };
};

export default useBillingData;
