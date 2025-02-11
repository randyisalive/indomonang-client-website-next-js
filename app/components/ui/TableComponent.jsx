"use client";
import React, { useEffect, useRef, useState } from "react";
import SearchTerms from "@/app/function/SearchTerms";
import SearchInput from "./form/SearchInput";
import BillingRows from "./tableComponent/Billing/BillingRows";
import WORows from "./tableComponent/WORows";
import JsonDisplay from "./JsonDisplay";
import { motion, AnimatePresence } from "framer-motion";
import BillingFooter from "./tableComponent/Billing/BillingFooter";
import WOFooter from "./tableComponent/WORows/WOFooter";
import InvoiceRows from "@/app/(main)/invoice/components/InvoiceRows";
import InvoiceBillsRows from "@/app/(main)/billing/components/InvoiceBillsRows";
import BillingSection from "@/app/(main)/billing/components/BillingSection";

import BillingFilter from "./tableComponent/Billing/BillingFilter";
import PaymentHistorySection from "./tableComponent/Invoice (payment history)/PaymentHistorySection";
import InvoiceFilter from "./tableComponent/Invoice (payment history)/InvoiceFilter";
import TableFiltersComponent from "./tableComponent/TableFiltersComponent";

const TableComponent = ({
  th_array = [],
  datas = [],
  TableType = "billing",
  dialogOnChange = () => {},
  children,
  footer = "",
  search_text = "",
  role = "Client",
  handleRating = () => {},
}) => {
  const [search, setSearch] = useState("");

  const { dataToDisplay } = SearchTerms(datas, search, setSearch);

  // filter
  const [filter, setFilter] = useState({ filter: false, state: false });

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const selectRef = useRef(null);
  const page_selection = [
    { id: 1, value: 5 },
    { id: 2, value: 10 },
    { id: 3, value: 15 },
    { id: 4, value: 20 },
    { id: 5, value: 25 },
    { id: 5, value: 35 },
    { id: 5, value: 50 },
  ];

  // Calculate the index range for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = dataToDisplay.slice(indexOfFirstRow, indexOfLastRow);

  // Pagination handler
  const handleClick = (event, number) => {
    event.preventDefault();
    setCurrentPage(number);
  };

  useEffect(() => {
    setSearch(search_text);
  }, [search_text]);

  // filters state
  const [filterForm, setFilterForm] = useState({
    date: "",
    main_ids: "",
    month: "",
    year: null,
    full_date: "",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col w-full "
    >
      {TableType === "invoice_bills" && (
        <div className=" pb-5">
          <BillingSection data={currentRows} />
        </div>
      )}
      {TableType === "invoice" && (
        <div className=" pb-5">
          <PaymentHistorySection data={currentRows} />
        </div>
      )}
      <TableFiltersComponent
        main_data={datas}
        filter_data={filterForm}
        search={search}
        setSearch={setSearch}
        form_placeholders={{ dropdown: TableType }}
      />
      <div className="flex flex-col">
        {!filter.filter && (
          <div className="w-full flex gap-3 px-5 lg:px-0">
            <SearchInput name="search" search={search} setSearch={setSearch} />
            <select
              className="border-2 text-center w-2"
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              ref={selectRef}
              value={rowsPerPage}
            >
              {page_selection.map((item) => (
                <option value={item.value} key={item.id}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="overflow-x-auto     mx-5 lg:mx-0">
        <table className="min-w-full mt-3  rounded-lg text-sm">
          <thead
            className=" text-gray-800"
            style={{ backgroundColor: "#f3f4f6" }}
          >
            <tr>
              {th_array.map((th, index) => (
                <th key={index} className="py-3 px-4 text-center border">
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => (
              <React.Fragment key={index}>
                {TableType === "billing" && (
                  <BillingRows
                    index={index}
                    item={item}
                    currentPage={currentPage}
                    rowsPerPage={rowsPerPage}
                  />
                )}
                {TableType === "wo" && (
                  <>
                    <WORows
                      item={item}
                      num={index}
                      currentPage={currentPage}
                      rowsPerPage={rowsPerPage}
                      handleWODialog={dialogOnChange}
                      role={role}
                      handleRating={handleRating}
                    />
                  </>
                )}
                {TableType === "invoice" && (
                  <>
                    <InvoiceRows
                      item={item}
                      num={index}
                      currentPage={currentPage}
                      rowsPerPage={rowsPerPage}
                      handleWODialog={dialogOnChange}
                      role={role}
                    />
                  </>
                )}
                {TableType === "invoice_bills" && (
                  <>
                    <InvoiceBillsRows
                      item={item}
                      num={index}
                      currentPage={currentPage}
                      rowsPerPage={rowsPerPage}
                      handleWODialog={dialogOnChange}
                      role={role}
                    />
                  </>
                )}
              </React.Fragment>
            ))}
          </tbody>
          <tfoot>
            {TableType === "billing" && (
              <BillingFooter currentRows={currentRows} />
            )}
            {TableType === "wo" && (
              <WOFooter currentRows={currentRows} all_data={datas} />
            )}
          </tfoot>
        </table>

        <nav className="mt-4 p-3">
          <ul className="flex justify-center space-x-2">
            {Array.from(
              { length: Math.ceil(dataToDisplay.length / rowsPerPage) },
              (_, index) => (
                <li key={index}>
                  <a
                    href="#!"
                    className={`px-3 py-1 border rounded-md ${
                      index + 1 === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-white text-blue-500"
                    }`}
                    onClick={(e) => handleClick(e, index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </motion.div>
  );
};

export default TableComponent;
