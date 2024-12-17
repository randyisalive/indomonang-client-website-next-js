"use client";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import SearchTerms from "@/app/function/SearchTerms";
import React, { useState } from "react";
import { motion } from "framer-motion";
import WebButton from "@/app/components/ui/WebButton";
import SubmitDialog from "./SubmitDialog";

const RefTable = ({
  datas = [],
  search = "",
  setSearch = () => {},
  item = {},
  FileHandler = () => {},
  isLoading = false,
}) => {
  const th_array = [
    "No",
    "Status",
    "Required Document",
    "Critical Point",
    "Document",
  ];

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
    <React.Fragment>
      {item && (
        <div className="w-1 sm:w-2 flex flex-col gap-2  text-sm mt-10 mb-3">
          <span className="font-bold text-sm">Completed Status:</span>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            className="w-fit"
          >
            <StatusBadge
              title={item.name}
              bg_color={item.bg_color?.bg_color}
              font_color="white"
            />
          </motion.div>
        </div>
      )}
      <div className="relative flex  flex-col">
        {isLoading ? (
          <div className="absolute  left-1/2 top-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2">
            <i className="pi pi-spinner pi-spin text-5xl"></i>
          </div>
        ) : null}

        <table
          className={
            isLoading
              ? "min-w-full shadow-md  text-sm opacity-65"
              : "min-w-full shadow-md text-sm"
          }
        >
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
                <tr>
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">{item[2267]}</td>
                  <td className="border px-4 py-2 text-center">{item[2264]}</td>
                  <td className="border px-4 py-2 text-center">{item[2265]}</td>
                  <td className="border px-4 py-2 text-center">
                    {item[2266] != "" ? (
                      item[2266]
                    ) : (
                      <>
                        <div className="relative flex w-full flex-col justify-center items-center ">
                          <i className="pi pi-upload cursor-pointer text-xl"></i>
                          <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={(e) => FileHandler(e, item.id)}
                          />
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {isLoading ? null : (
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
        )}
      </div>
      <SubmitDialog />
    </React.Fragment>
  );
};

export default RefTable;
