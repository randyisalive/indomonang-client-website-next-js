"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const TableComponentNew = ({
  columns = [],
  data = [],
  title = "Table Title",
  search_bar = true,
  link = "",
  numbering = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const selectRef = useRef(null);
  const page_selection = [
    { id: 1, value: 5 },
    { id: 2, value: 10 },
    { id: 3, value: 15 },
    { id: 4, value: 20 },
    { id: 5, value: 25 },
    { id: 6, value: 35 },
    { id: 7, value: 50 },
  ]; // Ensure unique IDs

  // Calculate the index range for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

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
      className="flex flex-col w-full"
    >
      {title && (
        <div className="my-3 flex justify-between items-center">
          <span className="font-bold text-base">{title}</span>
          <Link
            href={`${link}`}
            className="text-blue-500 text-sm hover:underline"
          >
            View All
          </Link>
        </div>
      )}
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {numbering && (
              <th className=" py-3 text-center text-sm border w-1">No</th>
            )}
            {columns.map((column, index) => (
              <th
                key={`${index}-${column.id}`}
                className="px-6 py-3 text-left border text-sm"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentRows.map((row, rowIndex) => (
            <tr key={`${rowIndex}-${row.id}`}>
              {numbering && (
                <td className="px-6 py-4 border whitespace-nowrap text-sm text-gray-900">
                  {indexOfFirstRow + rowIndex + 1}
                </td>
              )}
              {columns.map((column, colIndex) => (
                <td
                  key={`${colIndex}-${column.id}`}
                  className="px-6 py-4 border whitespace-nowrap text-sm text-gray-900"
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="mt-4 p-3">
        <ul className="flex justify-center space-x-2">
          {Array.from(
            { length: Math.ceil(data.length / rowsPerPage) },
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
    </motion.div>
  );
};

export default TableComponentNew;
