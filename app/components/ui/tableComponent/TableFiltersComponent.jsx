import React, { useEffect, useState } from "react";
import CalendarFilterComponent from "../form/CalendarFilterComponent";
import WebButton from "../WebButton";
import { motion, AnimatePresence } from "framer-motion";
import { enquiry_data } from "@/app/function/static_data";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const TableFiltersComponent = ({
  main_data = [],
  filter_data = { date: "", main_ids: "", month: "", year: "", full_date: "" },
  search = "",
  form_placeholders = { dropdown: "" },
  extra_filters = [],
  setSearch = () => {},
  TableType = "",
}) => {
  const [filter, setFilter] = useState(false);
  const [filterForm, setFilterForm] = useState(filter_data);
  const updateFilterForm = (field, value) => {
    setFilterForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // update search data
  useEffect(() => {
    const array_search = [Object.values(filterForm)];
    console.log(array_search);
    setSearch(array_search.filter(Boolean).join(","));
  }, [filterForm]);

  // clear filter form
  const clearSelectedForm = (e, name) => {
    setFilterForm((prev) => ({ ...prev, [name]: "" }));
  };

  // params wo
  const params = useSearchParams();
  const wo_status = params.get("s");

  return (
    <div className="flex flex-col lg:w-full  pb-3 items-center gap-3  mx-5 lg:mx-0 ">
      {TableType === "wo" && (
        <div className="w-full  pt-[24px] pr-[64px] pb-[24px]  gap-[24px] flex ">
          {console.log(main_data)}
          {enquiry_data.map((i) => {
            return (
              <Link href={`?s=${i.text}`} scroll={false}>
                <div
                  className={`pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[8px]  ${
                    wo_status === i.text && "border-b"
                  } border-b-[#9B1D24] w-fit`}
                >
                  <motion.label
                    whileHover={{ color: "#9B1D24" }}
                    style={wo_status === i.text && { color: "#9B1D24" }}
                    htmlFor=""
                    className={`${
                      wo_status === i.text ? "text-[#9B1D24]" : ""
                    }  font-[600] cursor-pointer`}
                  >
                    {i.text}
                  </motion.label>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:w-full  pb-3 items-center gap-3  mx-5 lg:mx-0">
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
              {/*  <Dropdown
              className="border w-full"
              value={filterForm.main_ids}
              optionLabel="main_ids"
              options={main_data}
              name="main_ids"
              valueTemplate={customValue}
              onChange={(e) => {
                console.log(e.value);
                updateFilterForm(e.target.name, e.value);
              }}
              placeholder={form_placeholders.dropdown}
            /> */}
              <CalendarFilterComponent
                settings="all"
                filterForm={filterForm}
                updateFilterForm={updateFilterForm}
              />
              <div className="w-full flex  relative items-center gap-2">
                {/* <select
                name="main_ids"
                className="border rounded-lg w-full text-gray-600 h-full"
                value={filterForm.main_ids}
                placeholder={form_placeholders.dropdown}
                onChange={(e) =>
                  updateFilterForm(e.target.name, e.target.value)
                }
              >
                <option defaultValue></option>
                {main_data.map((item) => {
                  return <option>{item.main_ids}</option>;
                })}
              </select> */}

                {/*  {TableType === "wo" && (
                <>
                  <select
                    name="status"
                    className="border rounded-lg w-full text-gray-600 h-full"
                    value={filterForm.status}
                    placeholder={form_placeholders.dropdown}
                    onChange={(e) =>
                      updateFilterForm(e.target.name, e.target.value)
                    }
                  >
                    <option defaultValue></option>
                    {TableType === "wo" && (
                      <>
                        {enquiry_data.map((item) => {
                          return <option>{item.text}</option>;
                        })}
                      </>
                    )}
                    {TableType === "invoice" && (
                      <>
                        <option value="unpaid">Unpaid</option>
                      </>
                    )}
                  </select>
                </>
              )} */}
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
                    setSearch("");
                  }}
                  className={`w-full lg:w-fit`}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TableFiltersComponent;
