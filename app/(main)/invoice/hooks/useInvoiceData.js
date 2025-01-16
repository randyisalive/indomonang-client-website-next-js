"use client";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import api from "@/app/api/api";
import { useEffect, useState } from "react";

const useInvoiceData = () => {
  // api
  const { InvoiceApi, WOApi, CustomerAccountApi } = api();
  const { getWoByUserId, getWoAll } = WOApi();
  const { getAccountById } = CustomerAccountApi();
  const { getInvoiceById, getInvoiceByWo, DownloadInvoices } = InvoiceApi();
  // dec_key
  const { accounts, role } = useAccountDataContext();

  // data
  const [invoice, setInvoice] = useState([]);
  const getData = async () => {
    try {
      if (accounts.id) {
        console.log(accounts);
        const company_id = accounts.company_id;
        if (role === "Admin") {
          const wo_data = await getWoAll();

          let wo_array = [];
          for (const i of wo_data) {
            wo_array.push(i["id"]);
          }
          if (wo_array.length > 0) {
            const invoice_data = await getInvoiceByWo(wo_array.join(", "));
            setInvoice(invoice_data);
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
              const filtered_invoice = invoice_data.filter((item) =>
                [
                  "Approved",
                  "Delivered",
                  "Arrived to Client",
                  "Closed",
                ].includes(item[1905])
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
    console.log(download_invoice);

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
