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

  //dropdown
  const [dropdown, setDropdown] = useState({
    priority: "",
    status: "",
    ref_num: "",
  });
  const [filter, setFilter] = useState(false);
  const [searchText, setSearchText] = useState(["", "", ""]);

  const customValue = (option, props) => {
    if (option && props.placeholder === "Priority") {
      return (
        <div className="flex align-items-center justify-between">
          <div>{option.text}</div>
          <i
            className="pi pi-times z-10"
            onClick={(e) => {
              e.stopPropagation();
              setDropdown((prev) => ({
                ...prev,
                priority: "",
              }));
              setSearchText((prev) => ["", prev[1], prev[2]]);
            }}
          ></i>
        </div>
      );
    } else if (option && props.placeholder === "Status") {
      return (
        <div className="flex align-items-center justify-between">
          <div>{option.text}</div>
          <i
            className="pi pi-times z-10"
            onClick={(e) => {
              e.stopPropagation();
              setDropdown((prev) => ({
                ...prev,
                status: "",
              }));
              setSearchText((prev) => [prev[0], "", prev[2]]);
            }}
          ></i>
        </div>
      );
    } else if (option && props.placeholder === "Reference") {
      return (
        <div className="flex align-items-center justify-between">
          <div>{option.ref_num}</div>
          <i
            className="pi pi-times z-10"
            onClick={(e) => {
              e.stopPropagation();
              setDropdown((prev) => ({
                ...prev,
                ref_num: "",
              }));
              setSearchText((prev) => [prev[0], prev[1], ""]);
            }}
          ></i>
        </div>
      );
    }
    return (
      <div className="flex align-items-center justify-between">
        <div>{props.placeholder}</div>
      </div>
    );
  };

  const ref_data = wo.map((item) => ({ ref_num: item.ref_num }));

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
