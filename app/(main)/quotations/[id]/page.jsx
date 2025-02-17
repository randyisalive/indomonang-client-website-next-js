"use client";
import React, { useEffect, useState } from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { useParams } from "next/navigation";
import { useQuotationContext } from "../context/QuotationsContext";

import "@react-pdf-viewer/core/lib/styles/index.css";
import { ProgressSpinner } from "primereact/progressspinner";
import WebButton from "@/app/components/ui/WebButton";
import QuotationDialog from "./components/QuotationDialog";
import RejectionQuotationDialog from "./components/RejectionQuotationDialog";
import { Message } from "primereact/message";
import { useDecryptionContext } from "@/app/Context/DecryptionContext";
import { decryptMessage } from "@/app/function/decryptor";

const QuotationDetailPage = () => {
  const { download_client_approval, pdf, quotations } = useQuotationContext();
  const { id } = useParams();
  const { decKey } = useDecryptionContext();
  const real_id = decryptMessage(decodeURIComponent(id), decKey);

  useEffect(() => {
    download_client_approval(real_id);
  }, [real_id]);

  // dialog state
  const [visible, setVisible] = useState({
    approveDialog: false,
    rejectDialog: false,
  });
  const handleVisible = (title = "", value = false) => {
    // setVisible(!visible);
    setVisible((prev) => ({ ...prev, [title]: value }));
    console.log(visible, title);
  };

  // quotation selected

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div className="flex  flex-col  items-center w-full  pt-7  sm:px-6 lg:px-0 mb-10 relative">
        <div className="w-1/2 ">
          <div className="w-full justify-between p-3 text-lg font-bold border-b mb-5">
            {quotations?.[0]?.[434]}
          </div>
          <div className="w-ful">
            {pdf.content ? (
              <Viewer
                fileUrl={`data:application/pdf;base64,${pdf?.content}`}
                renderLoader={(percentages) => <ProgressSpinner />}
              />
            ) : (
              <div className="flex justify-center">
                <Message
                  text="Quotation has not been printed!"
                  severity="error"
                />
              </div>
            )}
          </div>
          {pdf.content && (
            <>
              <div className="p-3 border-t mt-10 gap-3 flex justify-center">
                <WebButton
                  title="Approve"
                  className={`w-full`}
                  onClickFunction={() => handleVisible("approveDialog", true)}
                />
                <WebButton
                  title="Reject"
                  bg_color="#FF0000"
                  className={`w-full`}
                  onClickFunction={() => handleVisible("rejectDialog", true)}
                />
              </div>
              <QuotationDialog
                visible={visible.approveDialog}
                handleVisible={handleVisible}
              />
              <RejectionQuotationDialog
                visible={visible.rejectDialog}
                handleVisible={handleVisible}
              />
            </>
          )}
        </div>
      </div>
    </Worker>
  );
};

export default QuotationDetailPage;
