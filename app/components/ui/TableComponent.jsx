"use client";
import React, { useRef, useState } from "react";
import SearchTerms from "@/app/function/SearchTerms";
import SearchInput from "./form/SearchInput";
import BillingRows from "./tableComponent/BillingRows";
import WORows from "./tableComponent/WORows";
import JsonDisplay from "./JsonDisplay";

const TableComponent = ({
  th_array = [],
  datas = [],
  TableType = "billing",
  dialogOnChange = () => {},
}) => {
  const [search, setSearch] = useState("");

  const { dataToDisplay } = SearchTerms(datas, search, setSearch);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
    <div className="flex flex-col w-full ">
      <div className="flex gap-3">
        <SearchInput name="search" search={search} setSearch={setSearch} />
        <select
          className="border-2 w-1 text-center"
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
        >
          {page_selection.map((item) => (
            <option
              value={item.value}
              key={item.id}
              defaultValue={rowsPerPage === item.value}
            >
              {item.value}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <JsonDisplay data={datas} />
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
                    />
                  </>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <nav className="mt-4">
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
  );
};

export default TableComponent;
