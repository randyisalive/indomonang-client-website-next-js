"use client";
import api from "@/app/api/api";
import SearchInput from "@/app/components/ui/form/SearchInput";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { ATOB } from "@/app/function/decryptor";
import SearchTerms from "@/app/function/SearchTerms";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";
import { useParams } from "next/navigation";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";

const LastLogin = () => {
  const { profile } = useParams();
  const decrypt = ATOB(profile);

  if (decrypt === "last-login") {
    // api
    const { CustomerAccountLastLoginDataApi } = api();
    const { getLastLoginAllByParentId } = CustomerAccountLastLoginDataApi();

    // decryption
    const { user_id } = useDecryptionKeyData();

    // get last login data
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      const getData = async () => {
        try {
          if (user_id) {
            const datas = await getLastLoginAllByParentId(user_id);
            if (datas) {
              const bg_color = [
                { id: 0, text: "Success", bg_color: "#22c55e" },
                { id: 1, text: "Failed", bg_color: "#ef4444" },
              ];
              const json_datas = datas.map((item) => {
                return {
                  id: item.id,
                  date: item[2694],
                  status_data: bg_color.filter((x) => x.text === item[2695])[0],
                  keyword: item[2695],
                };
              });

              setData(json_datas);
              setIsLoading(true);
            }
          }
        } catch (e) {
          console.error(e);
        }
      };
      getData();
    }, [user_id]);
    const th_array = ["No", "Date", "Status"];
    const [search, setSearch] = useState("");

    const { dataToDisplay } = SearchTerms(data, search, setSearch);

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
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
      <div className="block ">
        <div className="flex gap-3">
          <SearchInput search={search} setSearch={setSearch} />
          <select
            name="pageMax"
            className="pl-10 py-2 border-2 focus:border-blue-500 focus:outline-none w-1/6"
            id=""
            onChange={(e) => setRowsPerPage(e.target.value)}
          >
            {page_selection.map((item) => {
              return (
                <option key={item.id} value={item.value}>
                  {item.value}
                </option>
              );
            })}
          </select>
        </div>
        <table className="min-w-full mt-3 shadow-md rounded-lg text-sm">
          <thead className="text-white" style={{ backgroundColor: "#3b71ca" }}>
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
              <tr key={item.id}>
                <td className="border px-4 py-2 text-center">
                  {index + 1 + (currentPage - 1) * rowsPerPage}
                </td>
                <td className="border px-4 py-2 text-center">{item.date}</td>
                <td className="border px-4 py-2 text-center">
                  <StatusBadge
                    title={item.status_data?.text}
                    bg_color={item.status_data?.bg_color}
                    font_color="white"
                  />
                </td>
              </tr>
            ))}
          </tbody>
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
    );
  }
};

export default LastLogin;
