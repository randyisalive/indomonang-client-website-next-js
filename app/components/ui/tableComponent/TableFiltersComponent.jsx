import React, { useEffect, useState } from "react";
import CalendarFilterComponent from "../form/CalendarFilterComponent";
import WebButton from "../WebButton";
import { motion, AnimatePresence, color } from "framer-motion";
import { enquiry_data } from "@/app/function/static_data";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import SearchInput from "../form/SearchInput";
import { useWoContext } from "@/app/(main)/your-orders/context/WoContext";

const TableFiltersComponent = ({
  filter_data = { date: "", main_ids: "", month: "", year: "", full_date: "" },
  search = "",
  setSearch = () => {},
  TableType = "",
  main_data = {},
  currentRows = 0,
}) => {
  const { wo } = useWoContext();
  const [filter, setFilter] = useState(false);
  const [filterForm, setFilterForm] = useState(filter_data);
  const updateFilterForm = (field, value) => {
    setFilterForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // params wo
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const wo_status = searchParams.get("s");

  const handleFilter = (text) => {
    const params = new URLSearchParams(searchParams);
    params.set("s", text);
    if (text === "Semua Order") {
      router.push(pathname, { scroll: false });
      return;
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col lg:w-full  pb-3 items-center gap-3  mx-5 lg:mx-0 ">
      {TableType === "wo" && (
        <div className="w-full  pt-[24px] pr-[64px] pb-[24px]  gap-[24px] flex ">
          <div
            onClick={() => router.push(pathname, { scroll: false })}
            className={`pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[8px]  ${
              wo_status === null && "border-b"
            } border-b-[#9B1D24] w-fit`}
          >
            <motion.label
              whileHover={{ color: "#9B1D24" }}
              style={
                wo_status === null ? { color: "#9B1D24" } : { color: "black" }
              }
              htmlFor=""
              className={`${
                wo_status === null ? "text-[#9B1D24]" : ""
              }  font-[600] cursor-pointer`}
            >
              Semua Order
            </motion.label>
          </div>

          {enquiry_data.map((i) => {
            return (
              <div
                onClick={() => handleFilter(i.value)}
                className={`pt-[8px] pr-[12px] pb-[8px] pl-[12px] gap-[8px]  ${
                  wo_status == i.value && "border-b"
                } border-b-[#9B1D24] w-fit`}
              >
                <motion.label
                  whileHover={{ color: "#9B1D24" }}
                  style={wo_status == i.value && { color: "#9B1D24" }}
                  htmlFor=""
                  className={`${
                    wo_status == i.value ? "text-[#9B1D24]" : ""
                  }  font-[600] cursor-pointer`}
                >
                  {i.text}
                </motion.label>
              </div>
            );
          })}
        </div>
      )}
      {TableType === "wo" && (
        <div className="w-full  flex ">
          Showing {currentRows.length} from {wo.length} data
        </div>
      )}

      <div className="flex flex-col lg:flex-row lg:w-full  pb-3 items-center gap-3  mx-5 lg:mx-0">
        <AnimatePresence>
          {!filter && (
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
                setSearch={setSearch}
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
              <SearchInput
                name="search"
                search={search}
                setSearch={setSearch}
                width="w-[320px]"
              />
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
                    router.push(`${pathname}`, { scroll: false });
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
