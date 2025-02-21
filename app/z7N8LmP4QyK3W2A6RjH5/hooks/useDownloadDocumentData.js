import api from "@/app/api/api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const useDownloadDocumentData = () => {
  //api
  const { ProcessingListApi } = api();
  const { DownloadAttachments } = ProcessingListApi();

  // data
  const { id } = useParams();
  const ids = id.slice(20, -20);

  const [pdf, setPdf] = useState({});
  const getData = async () => {
    try {
      const pdf_data = await DownloadAttachments(ids);
      if (pdf_data) {
        console.log(pdf_data);
        setPdf(pdf_data);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getData();
  }, [ids]);

  // download function
  const handleDownload = async () => {
    if (pdf) {
      const binaryString = atob(pdf.content);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: "application/zip" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = pdf.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return { getData, pdf, handleDownload };
};

export default useDownloadDocumentData;
