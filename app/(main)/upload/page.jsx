import HeaderComponent from "@/app/components/ui/HeaderComponent";
import React, { Suspense } from "react";
import UploadTableComponent from "./UploadTableComponent";
import { UploadDocumentProvider } from "./context/UploadDocumentContext";
import LoadingScreen from "@/app/components/ui/LoadingScreen";

const UploadPage = () => {
  return (
    <div
      className="flex flex-col w-full mx-auto  gap-[24px] "
      style={{ padding: "20px 64px" }}
    >
      <HeaderComponent title="Upload Document" />
      <div>
        <UploadDocumentProvider>
          <UploadTableComponent />
        </UploadDocumentProvider>
      </div>
    </div>
  );
};

export default UploadPage;
