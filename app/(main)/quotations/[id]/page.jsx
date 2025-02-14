"use client";
import React, { useEffect, useState } from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { useParams } from "next/navigation";
import { useQuotationContext } from "../context/QuotationsContext";

import "@react-pdf-viewer/core/lib/styles/index.css";
import { ProgressSpinner } from "primereact/progressspinner";
import WebButton from "@/app/components/ui/WebButton";
import QuotationDialog from "./components/QuotationDialog";

const QuotationDetailPage = () => {
  const { download_client_approval, pdf, quotations } = useQuotationContext();
  const { id } = useParams();

  useEffect(() => {
    download_client_approval(id);
  }, [id]);

  // dialog state
  const [visible, setVisible] = useState(false);
  const handleVisible = () => {
    setVisible(!visible);
  };

  // quotation selected
  const quotation_filtered = quotations?.filter((q) => q.id === id);
  console.log(quotation_filtered);

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div className="flex  flex-col  items-center w-full  pt-7  sm:px-6 lg:px-0 mb-10 relative">
        <div className="w-1/2 ">
          <div className="w-full justify-between p-3 text-lg font-bold border-b mb-5">
            {quotations?.[0]?.[434]}
          </div>
          <div className="w-full bg-red-100">
            {console.log(pdf)}
            {pdf.content && (
              <Viewer
                fileUrl={`data:application/pdf;base64,${pdf?.content}`}
                renderLoader={(percentages) => <ProgressSpinner />}
              />
            )}
          </div>
          <div className="p-3 border-t mt-10 gap-3 flex justify-center">
            <WebButton
              title="Approve"
              className={`w-full`}
              onClickFunction={() => handleVisible()}
            />
            <WebButton title="Reject" bg_color="#FF0000" className={`w-full`} />
          </div>
          <QuotationDialog visible={visible} handleVisible={handleVisible} />
        </div>
      </div>
    </Worker>
  );
};

export default QuotationDetailPage;
