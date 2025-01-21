import HeaderComponent from "@/app/components/ui/HeaderComponent";
import React from "react";
import UploadTableComponent from "./UploadTableComponent";

const UploadPage = () => {
  return (
    <div className="flex flex-col w-full mx-auto pt-7  sm:px-6, lg:px-0 max-w-screen-xl">
      <HeaderComponent
        title="Upload Document"
        breadcrumbs_array={[
          { id: 0, text: "Portal Home /", nav: "/" },
          { id: 1, text: "Upload Document", nav: "/upload" },
        ]}
      />
      <div className="mt-5">
        <UploadTableComponent />
      </div>
    </div>
  );
};

export default UploadPage;
