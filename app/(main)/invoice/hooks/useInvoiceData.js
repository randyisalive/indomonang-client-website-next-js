"use client";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import api from "@/app/api/api";
import { useEffect, useState } from "react";

const useInvoiceData = () => {
  // api
  const { InvoiceApi, WOApi, CustomerAccountApi } = api();
  const { getWoByUserId, getWoAll } = WOApi();
  const { getInvoiceByWo, DownloadInvoices } = InvoiceApi();
  // dec_key
  const { accounts, role } = useAccountDataContext();

  // data
  const [invoice, setInvoice] = useState([]);
  const getData = async () => {
    try {
      if (accounts.id) {
        const company_id = accounts.company_id;
        if (role === "Admin") {
          const wo_data = await getWoAll();

          let wo_array = [];
          for (const i of wo_data) {
            wo_array.push(i["id"]);
          }
          if (wo_array.length > 0) {
            const invoice_data = await getInvoiceByWo(wo_array.join(", "));
            const array_data = invoice_data.map((item) => {
              return {
                id: item.id,
                main_ids: item[1907], // for filter
                invoice_id: item[1907],
                status: item[1905],
                due_date: item[1914],
                payment_terms: item[1913],
                amount: item[2051],
                transactions: item[2838],
                payment_dates: item[2837],
                wo_ids: item[1916],
                wo_ids_val: item["1916_db_value"],
              };
            });
            setInvoice(array_data);
          }
        } else {
          if (company_id) {
            const wo_data = await getWoByUserId(company_id);

            let wo_array = [];
            for (const i of wo_data) {
              wo_array.push(i["id"]);
            }
            if (wo_array.length > 0) {
              const invoice_data = await getInvoiceByWo(wo_array.join(", "));
              const array_data = invoice_data.map((item) => {
                return {
                  id: item.id,
                  main_ids: item[1907], // for filter
                  invoice_id: item[1907],
                  status: item[1905],
                  due_date: item[1914],
                  payment_terms: item[1913],
                  amount: item[2051],
                  transactions: item[2838],
                  payment_dates: item[2837],
                };
              });
              const filtered_invoice = array_data.filter((item) =>
                [
                  "Approved",
                  "Delivered",
                  "Arrived to Client",
                  "Closed",
                ].includes(item.status)
              );

              setInvoice(filtered_invoice);
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleDownloadInvoice = async (id) => {
    const download_invoice = await DownloadInvoices(id);

    if (download_invoice) {
      const binaryString = atob(download_invoice.content);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "application/zip" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = download_invoice.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  useEffect(() => {
    getData();
  }, [accounts.id]);
  return { invoice, handleDownloadInvoice };
};

export default useInvoiceData;
