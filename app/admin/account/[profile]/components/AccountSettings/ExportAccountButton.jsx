import WebButton from "@/app/components/ui/WebButton";
import React from "react";

const ExportAccountButton = () => {
  return (
    <div>
      <WebButton
        title={
          <>
            <i className="pi pi-print"></i>
          </>
        }
        onClickFunction={() => {
          alert("Print, not yet ready!");
          window.location.href = "/admin/export";
        }}
      />
    </div>
  );
};

export default ExportAccountButton;
