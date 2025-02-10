"use client";
import TableComponent from "@/app/components/ui/TableComponent";
import React, { useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dropdown } from "primereact/dropdown";
import { useWoContext } from "../context/WoContext";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import { enquiry_data, priority_data } from "@/app/function/static_data";
import { AnimatePresence, motion } from "framer-motion";
import WebButton from "@/app/components/ui/WebButton";

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
          <div className="flex lg:w-full w-1/3 pb-3 items-center gap-3">
            <WebButton
              title={<i className="pi pi-filter"></i>}
              onClickFunction={() => {
                setFilter(!filter);
                setSearchText(["", "", ""]);
                setDropdown({});
              }}
            />

            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                {filter && (
                  <div className="flex gap-2 w-full">
                    <Dropdown
                      value={dropdown.ref_num}
                      filter
                      onChange={(e) => {
                        setDropdown((prev) => ({
                          ...prev,
                          ref_num: e.value,
                        }));
                        setSearchText((prev) => [
                          prev[0],
                          prev[1],
                          e.value?.ref_num || "",
                        ]);
                      }}
                      options={ref_data}
                      optionLabel="ref_num"
                      valueTemplate={customValue}
                      placeholder="Reference"
                      className="w-full border"
                    />
                    <Dropdown
                      value={dropdown.priority}
                      onChange={(e) => {
                        setDropdown((prev) => ({
                          ...prev,
                          priority: e.value,
                        }));
                        setSearchText((prev) => [
                          e.value?.text || "",
                          prev[1],
                          prev[2],
                        ]);
                      }}
                      options={priority_data}
                      optionLabel="text"
                      valueTemplate={customValue}
                      placeholder="Priority"
                      className="w-full border"
                    />
                    <Dropdown
                      value={dropdown.status}
                      onChange={(e) => {
                        setDropdown((prev) => ({
                          ...prev,
                          status: e.value,
                        }));
                        setSearchText((prev) => [
                          prev[0],
                          e.value?.text || "",
                          prev[2],
                        ]);
                      }}
                      options={enquiry_data}
                      optionLabel="text"
                      valueTemplate={customValue}
                      placeholder="Status"
                      className="w-full border"
                    />
                    <div className="flex">
                      <WebButton
                        title={
                          <>
                            <i className="pi pi-sync"></i>
                          </>
                        }
                        onClickFunction={() => {
                          setSearchText(["", "", ""]);
                          setDropdown({});
                        }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

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
