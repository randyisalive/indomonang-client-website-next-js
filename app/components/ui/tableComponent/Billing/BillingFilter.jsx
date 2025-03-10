"use client";
import React, { useEffect, useState } from "react";
import WebButton from "../../WebButton";
import { motion, AnimatePresence } from "framer-motion";
import { Dropdown } from "primereact/dropdown";
import { useInvoiceContext } from "@/app/(main)/invoice/context/InvoiceContext";
import CalendarFilterComponent from "../../form/CalendarFilterComponent";

const BillingFilter = ({ search = "", setSearch = () => {} }) => {
  const [filter, setFilter] = useState(false);
  const [filterForm, setFilterForm] = useState({
    date: "",
    invoice: "",
    month: "",
    year: null,
    full_date: "",
  });

  const updateFilterForm = (field, value) => {
    setFilterForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const { invoice } = useInvoiceContext();

  useEffect(() => {
    const array_search = [
      filterForm.month,
      filterForm.year,
      filterForm.invoice?.invoice_id,
    ];
    setSearch(array_search.filter(Boolean).join(","));
  }, [filterForm]);

  const unpaid_invoice = invoice.filter((item) =>
    ["Approved", "Delivered", "Arrived to Client"].includes(item.status)
  );

  const clearSelectedForm = (e, name) => {
    setFilterForm((prev) => ({ ...prev, [name]: "" }));
  };

  const customValue = (option, props) => {
    if (option && props.placeholder === "Invoice") {
      return (
        <div className="flex items-center justify-between">
          <div>{option.invoice_id}</div>
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
    <div className="flex flex-col lg:flex-row lg:w-full  pb-3 items-center gap-3  mx-5 lg:mx-0 ">
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
            className="flex gap-2 w-full flex-col lg:flex-row"
          >
            <Dropdown
              className="border w-full"
              value={filterForm.invoice}
              optionLabel="invoice_id"
              options={unpaid_invoice}
              name="invoice"
              valueTemplate={customValue}
              onChange={(e) => {
                updateFilterForm(e.target.name, e.value);
              }}
              placeholder="Invoice"
            />
            <CalendarFilterComponent
              settings="all"
              filterForm={filterForm}
              updateFilterForm={updateFilterForm}
            />

            <div className="flex">
              <WebButton
                title={
                  <>
                    <i className="pi pi-sync"></i>
                  </>
                }
                onClickFunction={() => {
                  updateFilterForm("date", "");
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

export default BillingFilter;
