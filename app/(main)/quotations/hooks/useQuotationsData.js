import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import api from "@/app/api/api";
import React, { useEffect, useState } from "react";

const useQuotationsData = () => {
  //api
  const { QuotationApi } = api();
  const { getQuotationByCompany, getQuotationAll, downloadClientApproval } =
    QuotationApi();

  // context
  const { accounts, role } = useAccountDataContext();

  // data state
  const [quotations, setQuotations] = useState([]);
  const getData = async () => {
    try {
      if (accounts) {
        let quotation_data;
        if (role === "Admin") {
          quotation_data = await getQuotationAll();
        } else if (role === "Client") {
          quotation_data = await getQuotationByCompany(accounts.company);
        }
        setQuotations(quotation_data);
        console.log(quotation_data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, [accounts]);

  const download_client_approval = async (id) => {
    try {
      const download = await downloadClientApproval(id);
      console.log(download);
      if (download) {
        const binaryString = atob(download.content);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: "application/zip" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = download.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return { quotations, download_client_approval };
};

export default useQuotationsData;
