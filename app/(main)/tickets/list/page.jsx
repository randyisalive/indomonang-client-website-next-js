"use client";
import SearchInput from "@/app/components/ui/form/SearchInput";
import React, { useState } from "react";
import useTicketListData from "./hooks/useTicketListData";
import SearchTerms from "@/app/function/SearchTerms";
import Link from "next/link";
import { motion } from "framer-motion";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { useTicketContext } from "../context/TicketContext";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import {
  priority_tickets_data,
  status_tickets_data,
  ticket_category_data,
} from "@/app/function/static_data";
import { tickets_category_data } from "./data/TicketsCategoryData";

const TicketListPage = () => {
  const { tickets } = useTicketContext();
  const { role } = useAccountDataContext();
  const th_array = [
    "Ticket ID",
    "Status",
    "Priority",
    "Reference Number",
    "Category",
    role === "Admin" ? "PIC Officer" : null,
    "Date Created",
  ].filter(Boolean);
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
                    <div className="flex w-full justify-center">
                      {status_tickets_data
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
                    </div>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <div className="flex justify-center w-full">
                      {priority_tickets_data
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
                    </div>
                  </td>

                  <td className="border px-4 py-2 text-center">{item[2466]}</td>
                  <td className="border px-4 py-2 ">
                    <div className="flex w-full justify-center">
                      {ticket_category_data
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
                    </div>
                  </td>
                  <td className="border px-4 py-2 text-center">{item[2498]}</td>
                  <td className="border px-4 py-2 text-center">
                    {item.date_added}
                  </td>
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
