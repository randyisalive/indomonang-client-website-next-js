"use client";
import React, { useEffect, useState } from "react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import { ProgressSpinner } from "primereact/progressspinner";
import { ProgressBar } from "primereact/progressbar";
import { Message } from "primereact/message";
import useQuotationsData from "../(main)/quotations/hooks/useQuotationsData";
import { useSearchParams } from "next/navigation";
import "@react-pdf-viewer/core/lib/styles/index.css";

const ViewQuotationPage = () => {
  const {
    quotations,
    downloadClientApproval,
    upload_client_signature,
    approve_quotation,
    pdf,
    setPdf,
    reject_quotation,
  } = useQuotationsData();
  const [selectedQuotation, setSelectedQuotation] = useState({});
  const [isLoading, setIsLoading] = useState(0);
  const params = useSearchParams();
  const encId = params.get("id");

  console.log(quotations);

  useEffect(() => {
    getData();
  }, [quotations, selectedQuotation]);

  const getData = async () => {
    if (Array.isArray(quotations)) {
      const filtered_quotation = quotations.filter((i) => i[3238] == encId)[0];
      console.log("Filtered Quotation: ", filtered_quotation);

      if (filtered_quotation) {
        setSelectedQuotation(filtered_quotation);
        setIsLoading(1);
        try {
          const data_pdf = await downloadClientApproval(filtered_quotation.id);
          if (data_pdf && data_pdf.content) {
            console.log("Data PDF:", data_pdf);
            setPdf(data_pdf); // Set the PDF content
          } else {
            console.warn("No PDF content returned from API");
            setIsLoading(2); // Set error state
          }
        } catch (error) {
          console.error("Error fetching PDF:", error);
          setIsLoading(2); // Set error state
        }
      }
    }
  };
  return (
    <div className="h-screen flex justify-center m-0 p-0">
      <div className="w-full h-full overflow-y-auto overflow-x-auto m-0">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div className="">
            {isLoading === 0 && (
              <div className="w-screen h-screen flex justify-center items-center">
                <ProgressSpinner />
              </div>
            )}
            {isLoading === 2 && <Message text="Error" />}
            {isLoading === 1 && (
              <>
                {pdf.content && (
                  <Viewer
                    fileUrl={`data:application/pdf;base64,${pdf?.content}`}
                    renderLoader={(percentages) => (
                      <ProgressBar value={percentages} />
                    )}
                  />
                )}
              </>
            )}
          </div>
        </Worker>
      </div>
    </div>
  );
};

export default ViewQuotationPage;
