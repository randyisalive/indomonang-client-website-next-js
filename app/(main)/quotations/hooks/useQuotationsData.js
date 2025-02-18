import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import api from "@/app/api/api";
import React, { useEffect, useState } from "react";

const useQuotationsData = () => {
  //api
  const { QuotationApi, TermsOfServiceApi } = api();
  const {
    getQuotationByCompany,
    getQuotationAll,
    downloadClientApproval,
    uploadClientSignature,
    ApproveQuotations,
    RejectQuotations,
    InputRejectionNote,
  } = QuotationApi();

  // context
  const { accounts, role } = useAccountDataContext();

  // data state
  const [quotations, setQuotations] = useState([]);
  const getData = async () => {
    try {
      if (accounts) {
        const quotation_data = await getQuotationByCompany(accounts.company_id);
        setQuotations(quotation_data);
        console.log(quotation_data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, [accounts.company]);

  // pdf data
  const [pdf, setPdf] = useState([]);

  const download_client_approval = async (id = 136) => {
    try {
      const download = await downloadClientApproval(id);
      if (download) {
        setPdf(download);
        /*  const binaryString = atob(download.content);
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
        document.body.removeChild(link); */
      }
    } catch (e) {
      console.error(e);
    }
  };

  const upload_client_signature = async (name, base64Content, id) => {
    if (id) {
      try {
        const upload_attachment = await uploadClientSignature(
          name,
          "signature.png",
          base64Content,
          id
        );
        console.log(upload_attachment);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const approve_quotation = async (id) => {
    try {
      const approve = await ApproveQuotations(id);
      if (approve) {
        window.location.href = "/quotations";
      }
    } catch (e) {
      console.error(e);
    }
  };

  const reject_quotation = async (id, rejection_note) => {
    try {
      if (rejection_note) {
        const rejectionNotes = await InputRejectionNote(id, rejection_note);
        if (rejectionNotes) {
          const rejection = await RejectQuotations(id);
          if (rejection) {
            window.location.href = "/quotations";
          }
        }
      } else {
        throw new Error("Rejection Note empty!!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    quotations,
    download_client_approval,
    pdf,
    upload_client_signature,
    approve_quotation,
    reject_quotation,
  };
};

export default useQuotationsData;
