"use client";
import SearchInput from "@/app/components/ui/form/SearchInput";
import React, { useState } from "react";
import useTicketListData from "./hooks/useTicketListData";
import SearchTerms from "@/app/function/SearchTerms";
import Link from "next/link";
import { motion } from "framer-motion";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { useTicketContext } from "../context/TicketContext";

const TicketListPage = () => {
  const { tickets } = useTicketContext();
  const th_array = [
    "Ticket ID",
    "Status",
    "Priority",
    "Reference Number",
    "Category",
    "Date Created",
  ];
  const [search, setSearch] = useState("");

  const { dataToDisplay } = SearchTerms(tickets, search, setSearch);

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

  // status & priority
  const status_data = [
    { id: 0, text: "Open", bg_color: "#00C49A" },
    { id: 1, text: "On Progress", bg_color: "#007BFF" },
    { id: 2, text: "Closed", bg_color: "#BFC9CA" },
    { id: 3, text: "Canceled", bg_color: "#DC3545" },
  ];

  const priority_data = [
    { id: 0, text: "High", bg_color: "#FFEB3B" },
    { id: 1, text: "Low", bg_color: "#007BFF" },
    { id: 2, text: "Medium", bg_color: "#FF9800" },
    { id: 3, text: "Urgent", bg_color: "#ff0000" },
  ];

  // category
  const ticket_category = [
    { id: 0, text: "Bug Reports", bg_color: "#B6244F" },
    { id: 1, text: "Complaints", bg_color: "#DC3545" },
    { id: 2, text: "Follow-up on Previous Issues", bg_color: "#007BFF" },
    { id: 3, text: "General Inquiries", bg_color: "#FFD289" },
    { id: 4, text: "Invoice Queries", bg_color: "#9A1C20" },
    { id: 5, text: "Order Status", bg_color: "#72A276" },
    { id: 6, text: "Other Issues", bg_color: "#BFC9CA" },
    { id: 7, text: "Payment Issues", bg_color: "#D4EDDA" },
    { id: 8, text: "Refund Requests", bg_color: "#00C49A" },
    { id: 9, text: "Subscription Problems", bg_color: "#008BF8" },
    { id: 10, text: "Uncategorized Requests", bg_color: "#3F612D" },
  ];
  return (
    <div className="mx-5 lg:mx-0">
      <SearchInput search={search} setSearch={setSearch} />
      <div className=" overflow-x-auto">
        <table className="min-w-full mt-3 shadow-md rounded-lg text-sm">
          <thead className="text-white" style={{ backgroundColor: "#9c1c23" }}>
            <tr>
              {th_array.map((i) => {
                return (
                  <th key={i} className="py-3 px-4 text-center border">
                    {i}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => {
              return (
                <tr key={item[2469]}>
                  <td className="border px-4 py-2 text-center ">
                    <Link
                      href={`list/${item[2469]}?date_added=${item["date_added"]}&ref=${item[2466]}&category=${item[2470]}&details=${item[2465]}`}
                    >
                      <motion.span
                        whileHover={{ textDecoration: "underline" }}
                        className="text-blue-600 cursor-pointer"
                      >
                        {item[2469]}
                      </motion.span>
                    </Link>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {status_data
                      .filter((x) => x.text === item[2467])
                      .map((i) => {
                        return (
                          <>
                            {item[2467] && (
                              <StatusBadge
                                key={i.id}
                                title={i.text}
                                bg_color={i.bg_color}
                                font_color="white"
                              />
                            )}
                          </>
                        );
                      })}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {priority_data
                      .filter((x) => x.text === item[2769])
                      .map((i) => {
                        return (
                          <>
                            {item[2769] && (
                              <StatusBadge
                                title={i.text}
                                bg_color={i.bg_color}
                                font_color="white"
                              />
                            )}
                          </>
                        );
                      })}
                  </td>

                  <td className="border px-4 py-2 "> {item[2466]}</td>
                  <td className="border px-4 py-2 ">
                    {ticket_category
                      .filter((x) => x.text === item[2470])
                      .map((i) => {
                        return (
                          <StatusBadge
                            title={i.text}
                            bg_color={i.bg_color}
                            font_color="white"
                          />
                        );
                      })}
                  </td>
                  <td className="border px-4 py-2 ">{item["date_added"]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

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
  );
};

export default TicketListPage;
