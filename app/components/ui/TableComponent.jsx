"use client";
import React, { useRef, useState } from "react";
import SearchTerms from "@/app/function/SearchTerms";
import SearchInput from "./form/SearchInput";
import BillingRows from "./tableComponent/Billing/BillingRows";
import WORows from "./tableComponent/WORows";
import JsonDisplay from "./JsonDisplay";
import { motion } from "framer-motion";
import BillingFooter from "./tableComponent/Billing/BillingFooter";
import WOFooter from "./tableComponent/WORows/WOFooter";
import InvoiceRows from "@/app/(main)/invoice/components/InvoiceRows";
import InvoiceFooter from "@/app/(main)/invoice/components/InvoiceFooter";
import InvoiceBillsRows from "@/app/(main)/billing/components/InvoiceBillsRows";

const TableComponent = ({
  th_array = [],
  datas = [],
  TableType = "billing",
  dialogOnChange = () => {},
  children,
  footer = "",
  role = "Client",
  handleRating = () => {},
}) => {
  const [search, setSearch] = useState("");

  const { dataToDisplay } = SearchTerms(datas, search, setSearch);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col w-full "
    >
      <div className="flex gap-3">
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

      <JsonDisplay data={datas} />
      <div className="overflow-x-auto sm:overflow-hidden overflow-y-hidden ">
        <table className="min-w-full mt-3 shadow-md rounded-lg text-sm">
          <thead className="text-white" style={{ backgroundColor: "#9c1c23" }}>
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
        {TableType === "invoice_bills" && (
          <div className="my-5 w-full  flex justify-end   p-3">
            <div>
              <InvoiceFooter all_data={currentRows} />
            </div>
          </div>
        )}
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
