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
    "Order Date",
    "Ref No",
    role === "Admin" ? "Company" : null,
    "Service",
    "Priority",
    "Applicant",
    "City / Country",

    "Status",

    "Rate Order",
  ].filter(Boolean);

  const [searchText, setSearchText] = useState(["", "", ""]);

  return (
    <div className="text-center sm:m-0">
      <TableComponent
        th_array={th_array}
        datas={wo}
        TableType="wo"
        role={role}
        search_text={searchText.filter(Boolean).join(",")}
        dialogOnChange={handleWODialog}
        handleRating={handleRating}
        isLoading={isLoading}
      />
    </div>
  );
};

export default WOTable;
