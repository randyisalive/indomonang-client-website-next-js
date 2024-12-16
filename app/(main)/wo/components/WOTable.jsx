"use client";
import TableComponent from "@/app/components/ui/TableComponent";
import useWOData from "@/app/hooks/useWOData";
import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import JsonDisplay from "@/app/components/ui/JsonDisplay";

const WOTable = () => {
  const { wo, isLoading, handleWODialog } = useWOData();
  const th_array = [
    "No",
    "Reference Number",
    "Status",
    "Service",
    "Estimated Done",
    "Action",
  ];

  return (
    <div className=" text-center h-screen">
      {isLoading ? (
        <div className="mt-5">
          <ProgressSpinner />
        </div>
      ) : (
        <TableComponent
          th_array={th_array}
          datas={wo}
          TableType="wo"
          dialogOnChange={handleWODialog}
        />
      )}
    </div>
  );
};

export default WOTable;
