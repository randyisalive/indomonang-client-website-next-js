"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WebButton from "../../WebButton";
import { useInvoiceContext } from "@/app/(main)/invoice/context/InvoiceContext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { invoice_data, invoice_data_client } from "@/app/function/static_data";

const InvoiceFilter = ({
  search = "",
  setSearch = () => {},
  filter = false,
  setFilter = () => {},
}) => {
  const [filterForm, setFilterForm] = useState({
    date: "",
    invoice: "",
    status: "",
    full_data: "",
  });
  const { invoice } = useInvoiceContext();
  const payment_history_data = invoice.filter((item) =>
    ["Closed", "Canceled"].includes(item[1905])
  );

  useEffect(() => {
    const array_search = [
      filterForm.date,
      filterForm.invoice?.[1907],
      filterForm.status?.real_data,
    ];
    setSearch(array_search.filter(Boolean).join(","));
  }, [filterForm]);

  const clearSelectedForm = (e, name) => {
    setFilterForm((prev) => ({ ...prev, [name]: "" }));
  };

  const customValue = (option, props) => {
    if (option && props.placeholder === "Invoice") {
      return (
        <div className="flex items-center justify-between">
          <div>{option[1907]}</div>
          <i
            className="pi pi-times z-10"
            onClick={(e) => {
              e.stopPropagation();
              clearSelectedForm(e, props.name);
            }}
          ></i>
        </div>
      );
    }
    if (option && props.placeholder === "Status") {
      return (
        <div className="flex items-center justify-between">
          <div>{option.text}</div>
          <i
            className="pi pi-times z-10"
            onClick={(e) => {
              e.stopPropagation();
              clearSelectedForm(e, props.name);
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
  return (
    <div className="flex flex-col lg:flex-row lg:w-full w-full pb-3 items-center gap-3">
      <WebButton
        title={<i className="pi pi-filter"></i>}
        onClickFunction={() => {
          setFilter(!filter);
        }}
        className={`w-full lg:w-fit`}
      />

      <AnimatePresence>
        {filter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col lg:flex-row gap-2 w-full"
          >
            <Dropdown
              className="border w-full"
              value={filterForm.invoice}
              optionLabel="1907"
              options={payment_history_data}
              filter
              name="invoice"
              valueTemplate={customValue}
              onChange={(e) => {
                setFilterForm((prev) => ({
                  ...prev,
                  [e.target.name]: e.value,
                }));
              }}
              placeholder="Invoice"
            />
            <Dropdown
              className="border w-full"
              value={filterForm.status}
              optionLabel="text"
              options={invoice_data_client}
              name="status"
              valueTemplate={customValue}
              onChange={(e) => {
                setFilterForm((prev) => ({
                  ...prev,
                  [e.target.name]: e.value,
                }));
              }}
              placeholder="Status"
            />
            <div className="flex justify-center w-full  relative">
              <Calendar
                inputId="date"
                value={filterForm.full_data}
                onChange={(e) => {
                  const date = e.value;
                  let formattedDate =
                    date.toLocaleString("default", { month: "long" }) +
                    " " +
                    date.getFullYear();
                  setFilterForm((prev) => ({ ...prev, date: formattedDate }));
                }}
                className="border text-gray-700 p-2 rounded-md w-full"
                view="month"
                name="date"
                placeholder="Date"
                dateFormat="MM yy"
                touchUI
              />

              {filterForm.date && (
                <>
                  <i
                    className="pi text-gray-500 cursor-pointer pi-times absolute right-0 flex h-full items-center pr-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearSelectedForm(e, "date");
                    }}
                  ></i>
                </>
              )}
            </div>
            <div className="flex">
              <WebButton
                title={
                  <>
                    <i className="pi pi-sync"></i>
                  </>
                }
                onClickFunction={() => {
                  setFilterForm({});
                }}
                className={`w-full lg:w-fit`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InvoiceFilter;
