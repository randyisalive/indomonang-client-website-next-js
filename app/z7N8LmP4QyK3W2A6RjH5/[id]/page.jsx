"use client";
import React from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import useDownloadDocumentData from "../hooks/useDownloadDocumentData";
import { useDecryptionContext } from "@/app/Context/DecryptionContext";
import WebButton from "@/app/components/ui/WebButton";
import { useParams } from "next/navigation";
import { encryptMessage } from "@/app/function/decryptor";

const DocumentDetailPage = () => {
  const { getData, pdf, handleDownload } = useDownloadDocumentData();
  const { decKey } = useDecryptionContext();
  const { id } = useParams();
  const dec_id = encryptMessage(id, decKey);

  return (
    <div className="flex justify-center items-center flex-col">
      {pdf?.content && (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div className="w-1/2 ">
            <Viewer fileUrl={`data:application/pdf;base64,${pdf?.content}`} />
          </div>
        </Worker>
      )}
      <div className="p-3 w-full  flex justify-center items-center">
        <div className="w-1/2 flex justify-center gap-5 p-2">
          <WebButton
            className={`w-1/2`}
            title={
              <>
                <div className="flex items-center justify-center gap-2">
                  <i className="pi pi-download"></i>
                  <span>Download</span>
                </div>
              </>
            }
            onClickFunction={() => handleDownload()}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentDetailPage;
