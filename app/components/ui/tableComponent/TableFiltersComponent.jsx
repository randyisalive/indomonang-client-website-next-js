import React, { useEffect, useState } from "react";
import CalendarFilterComponent from "../form/CalendarFilterComponent";
import WebButton from "../WebButton";
import { motion, AnimatePresence } from "framer-motion";

const TableFiltersComponent = ({
  main_data = [],
  filter_data = { date: "", main_ids: "", month: "", year: "", full_date: "" },
  search = "",
  form_placeholders = { dropdown: "" },
  extra_filters = [],
  setSearch = () => {},
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

  // template
  const customValue = (option, props) => {
    if (option && props.placeholder === form_placeholders.dropdown) {
      return (
        <div className="flex items-center justify-between">
          <div>{option.main_ids}</div>
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
            <div className="w-full flex  relative items-center">
              <select
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
              </select>
            </div>

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
  );
};

export default TableFiltersComponent;
