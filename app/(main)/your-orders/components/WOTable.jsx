"use client";
import TableComponent from "@/app/components/ui/TableComponent";
import React, { useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";

import { useWoContext } from "../context/WoContext";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";

const WOTable = () => {
  const { wo, isLoading, handleWODialog, handleRating } = useWoContext();
  const { role } = useAccountDataContext();
  const th_array = [
    "No",
    role === "Admin" ? "Company" : null,
    "Reference Number",
    "Status",
    "Service",
    "Applicant Name",
    "Priority",
    "City / Country",
    "Date Ordered",
    "Rate Order",
  ].filter(Boolean);

  const [searchText, setSearchText] = useState(["", "", ""]);

  return (
    <div className="text-center mx-5 sm:m-0">
      {isLoading ? (
        <div className="mt-5">
          <ProgressSpinner />
        </div>
      ) : (
        <>
          <TableComponent
            th_array={th_array}
            datas={wo}
            TableType="wo"
            role={role}
            search_text={searchText.filter(Boolean).join(",")}
            dialogOnChange={handleWODialog}
            handleRating={handleRating}
          />
        </>
      )}
    </div>
  );
};

export default WOTable;
