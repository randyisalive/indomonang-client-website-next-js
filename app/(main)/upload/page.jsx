import HeaderComponent from "@/app/components/ui/HeaderComponent";
import React from "react";
import SearchBarUpload from "./components/SearcBarUpload";
import UploadTableComponent from "./UploadTableComponent";

const UploadPage = () => {
  return (
    <div className="flex flex-col w-full mx-auto pt-7  sm:px-6, lg:px-0 max-w-screen-xl">
      <HeaderComponent
        title="Upload Documents"
        breadcrumbs="Portal Home / Upload"
      />

      <div className="my-3">
        <UploadTableComponent />
      </div>
    </div>
  );
};

export default UploadPage;
