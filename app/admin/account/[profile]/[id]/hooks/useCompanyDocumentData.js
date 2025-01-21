import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import api from "@/app/api/api";
import React, { useEffect, useState } from "react";

const useCompanyDocumentData = () => {
  // api
  const { CompanyDocumentApi } = api();
  const { getCompanyDocumentById, DownloadDocument } = CompanyDocumentApi();

  //context
  const { accounts } = useAccountDataContext();
  // fetch data
  const [documentData, setDocumentData] = useState([]);
  const getData = async () => {
    try {
      if (accounts.company_id) {
        const document = await getCompanyDocumentById(accounts.company_id);
        if (document) {
          setDocumentData(document);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDownloadDocument = async (id) => {
    const download = await DownloadDocument(id);

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
  };

  return { documentData, handleDownloadDocument };
};

export default useCompanyDocumentData;
