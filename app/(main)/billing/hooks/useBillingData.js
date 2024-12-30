"use client";
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
  const { user_id, role } = useDecryptionKeyData();

  // get data
  const [bills, setBills] = useState([]);
  const [isLoading, setIsLoading] = useState(0);
  const getData = async () => {
    try {
      if (user_id != null) {
        const bill_status = [
          { id: 0, text: "Paid in Full", bg_color: "#8BC34A" },
          { id: 1, text: "Paid Partially", bg_color: "#F44336" },
        ];

        if (role === "Admin") {
          const billing_data = await getPaymentAll();
          console.log(role);

          const datas = billing_data.map((item) => {
            return {
              id: item.id,
              transactions_number: item[2143],
              status_name: bill_status.filter((x) => x.text === item[2213])[0],
              date_of_payment: item[1954],
              amount_of_payment: item[2211],
              amount_paid: item[1959],
              outstanding_balance: item[2216],
            };
          });
          const outstanding_totals = billing_data.reduce(
            (acc, item) => acc + item[2212],
            0
          );
          setBills({
            billing_data: datas,
            outstanding_total: outstanding_totals,
            amount_paid: "",
            amount_of_payment: "",
          });
          setIsLoading(1);
          return;
        }
        const user_data = await getAccountById(user_id);
        const wo_data = await getWoByUserId(user_data[0]["2630_db_value"]);
        const wo_array = wo_data.map((item) => {
          return item.id;
        });

        const invoice_data = await getInvoiceByWo(wo_array.join(","));
        const invoice_ids = invoice_data.map((item) => item.id);
        const billing_data = await getPaymentByNoInvoice(invoice_ids.join(","));

        const datas = billing_data.map((item) => {
          return {
            id: item.id,
            transactions_number: item[2143],
            status_name: bill_status.filter((x) => x.text === item[2213])[0],
            date_of_payment: item[1954],
            amount_of_payment: item[2211],
            amount_paid: item[1959],
            outstanding_balance: item[2216],
          };
        });
        const outstanding_totals = billing_data.reduce(
          (acc, item) => acc + item[2212],
          0
        );
        setBills({
          billing_data: datas,
          outstanding_total: outstanding_totals,
          amount_paid: "",
          amount_of_payment: "",
        });
        setIsLoading(1);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, [user_id, role]);
  return { bills, isLoading };
};

export default useBillingData;
