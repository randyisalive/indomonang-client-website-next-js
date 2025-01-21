import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import WebButton from "@/app/components/ui/WebButton";
import { saveAs } from "file-saver";
import React from "react";
import * as XLSX from "xlsx";
import { useExpatriateListContext } from "../../[id]/context/ExpatriateListContext";
import { useRouter } from "next/navigation";

const ExportAccountButton = () => {
  const { role } = useAccountDataContext();
  const { expatriates } = useExpatriateListContext();
  const router = useRouter();
  const expat_export = expatriates.map((item) => {
    return { ExpatriateID: item[1536] };
  });
  const exportToXLSX = (fileName = "", data = []) => {
    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    // Write the workbook to a binary string
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    // Create a Blob from the binary string
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    // Save the Blob as a file
    saveAs(dataBlob, `${fileName}.xlsx`);
  };
  return (
    <div>
      {role === "Admin" && (
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
      )}
    </div>
  );
};

export default ExportAccountButton;
