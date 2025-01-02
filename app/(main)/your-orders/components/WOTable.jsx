"use client";
import TableComponent from "@/app/components/ui/TableComponent";
import useWOData from "@/app/hooks/useWOData";
import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";

const WOTable = () => {
  const { wo, isLoading, handleWODialog, handleRating } = useWOData();
  const { role } = useDecryptionKeyData();
  const th_array = [
    "No",
    role === "Admin" ? "Company" : null,
    "Reference Number",
    "Status",
    "Service",
    "Estimated Done",
    "Rate Order",
    "Action",
  ].filter(Boolean);

  return (
    <div className=" text-center  mx-5 sm:m-0 ">
      {isLoading ? (
        <div className="mt-5">
          <ProgressSpinner />
        </div>
      ) : (
        <TableComponent
          th_array={th_array}
          datas={wo}
          TableType="wo"
          role={role}
          dialogOnChange={handleWODialog}
          handleRating={handleRating}
        />
      )}
    </div>
  );
};

export default WOTable;
