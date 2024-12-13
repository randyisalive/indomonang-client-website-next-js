"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import SearchTerms from "@/app/function/SearchTerms";
import SearchInput from "./form/SearchInput";
import StatusBadge from "./tableComponent/StatusBadge";

const TableComponent = ({ th_array = [], datas = [], rowsPerPage = 10 }) => {
  const [search, setSearch] = useState("");

  const { dataToDisplay } = SearchTerms(datas, search, setSearch);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);

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
      <SearchInput name="search" search={search} setSearch={setSearch} />
      <div className="overflow-x-auto">
        <table className="min-w-full mt-3  shadow-md rounded-lg text-xs">
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
              <tr key={index} className="hover:bg-gray-100 bg-gray-50">
                <td className="border px-4 py-2 text-center">
                  {index + 1 + (currentPage - 1) * rowsPerPage}
                </td>
                <td className="border px-4 py-2 text-center">{item.ref_num}</td>
                <td className="border px-4 py-2 w-full flex items-center justify-center">
                  <StatusBadge
                    title={item.status_name}
                    bg_color="#1062FE"
                    font_color="white"
                  />
                </td>
                <td className="border px-4 py-2">{item.date}</td>
                <td className="border px-4 py-2">{item.date_added}</td>
                <td className="border px-4 py-2">{item[2470]}</td>
                <td className="border px-4 py-2 text-center">
                  <motion.span
                    whileHover={{
                      color: "#912534",
                      textDecoration: "underline",
                    }}
                    className="cursor-pointer"
                    onClick={() => {
                      nav(`/app/${BTOA("tickets")}/${item.id}`);
                    }}
                  >
                    View Details
                  </motion.span>
                </td>
              </tr>
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
