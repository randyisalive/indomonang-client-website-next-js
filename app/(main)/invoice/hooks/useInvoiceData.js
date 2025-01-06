"use client";
import api from "@/app/api/api";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import React, { useEffect, useState } from "react";

const useInvoiceData = () => {
  // api
  const { InvoiceApi, WOApi, CustomerAccountApi } = api();
  const { getWoByUserId, getWoAll } = WOApi();
  const { getAccountById } = CustomerAccountApi();
  const { getInvoiceById, getInvoiceByWo } = InvoiceApi();
  // dec_key
  const { user_id, role } = useDecryptionKeyData();

  // data
  const [invoice, setInvoice] = useState([]);
  const getData = async () => {
    try {
      if (user_id) {
        const account_data = await getAccountById(user_id);
        const company_id = account_data[0]["2630_db_value"];
        if (role === "Admin") {
          const wo_data = await getWoAll();
          console.log(wo_data);

          let wo_array = [];
          for (const i of wo_data) {
            wo_array.push(i["id"]);
          }
          const invoice_data = await getInvoiceByWo(wo_array.join(", "));
          console.log(invoice_data);
          setInvoice(invoice_data);
        } else {
          if (company_id) {
            const wo_data = await getWoByUserId(company_id);
            console.log(wo_data);

            let wo_array = [];
            for (const i of wo_data) {
              wo_array.push(i["id"]);
            }
            const invoice_data = await getInvoiceByWo(wo_array.join(", "));
            console.log(invoice_data);
            setInvoice(invoice_data);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, [user_id]);
  return { invoice };
};

export default useInvoiceData;
