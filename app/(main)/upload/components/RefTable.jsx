"use client";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import SearchTerms from "@/app/function/SearchTerms";
import React, { useState } from "react";
import { motion } from "framer-motion";
import SubmitDialog from "./SubmitDialog";
import { Message } from "primereact/message";
import { document_status } from "@/app/function/static_data";

const RefTable = ({
  datas = [],
  search = "",
  setSearch = () => {},
  item = {},
  FileHandler = () => {},
  isLoading = false,
  ref_num = "",
  commen_data = [],
  deleteAttachmentBtn = () => {},
  handleDownloadUploadedDocuments = () => {},
}) => {
  const latest_submmited = commen_data
    .filter((item) => item[3228] === "Submitted")
    .sort((a, b) => b.id - a.id);

  const th_array = [
    "No",
    "Status",
    "Required Document",
    "Critical Point",
    "Date Uploaded",
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

  // status open uploaded
  const openData = datas.filter((x) => x[2267] === "Deleted");
  return (
    <React.Fragment>
      {datas.length > 0 && (
        <div className="mx-5 sm:mx-0 sm:w-full   flex flex-col gap-2  text-sm mt-10 mb-3">
          <span className="font-bold text-sm w-full">
            Document Completeness Status:
          </span>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            className="w-fit"
          >
            <StatusBadge
              title={`${item.name}`}
              bg_color={item.bg_color?.bg_color}
              font_color={item.name === "Waiting" ? "black" : "white"}
            />
          </motion.div>
          <span className=" text-xs my-2">
            <p>
              <strong>Latest Submitted Time:</strong>
            </p>
            <p> {latest_submmited?.[0]?.["date_added"]}</p>
          </span>
        </div>
      )}
      <div className="relative flex m-5 sm:m-0 overflow-x-auto  flex-col">
        {isLoading ? (
          <div className="absolute  left-1/2 top-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2">
            <i className="pi pi-spinner pi-spin text-5xl"></i>
          </div>
        ) : null}
        {item.name === "Submitted" ? (
          <motion.i
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="pi pi-lock opacity-50 text-8xl absolute left-1/2 top-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2"
          ></motion.i>
        ) : null}
        {datas.length > 0 && (
          <table
            className={
              isLoading || item.name === "Completed"
                ? "min-w-full shadow-md  text-sm  "
                : "min-w-full shadow-md text-sm"
            }
          >
            <thead style={{ backgroundColor: "#f3f4f6" }}>
              <tr>
                {th_array.map((th, index) => (
                  <th key={index} className="py-3 px-4 text-center border">
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((i, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td className="border px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      {document_status
                        .filter((x) => x.text === i[2267])
                        .map((a) => {
                          return (
                            <StatusBadge
                              title={`${a.text}`}
                              font_color={"white"}
                              bg_color={a.bg_color}
                            />
                          );
                        })}
                    </td>
                    <td className="border px-4 py-2 text-center">{i[2264]}</td>
                    <td className="border px-4 py-2 text-center">{i[2265]}</td>
                    <td className="border px-4 py-2 text-center">{i[3220]}</td>
                    <td className="border px-4 py-2 text-center">
                      {i[2266] != "" ? (
                        <div className="flex gap-2 items-center">
                          <span
                            className="w-full text-left text-blue-500 hover:underline cursor-pointer"
                            onClick={() =>
                              handleDownloadUploadedDocuments(i.id)
                            }
                          >
                            {i[2266]}
                          </span>

                          {item.name === "Waiting" ? (
                            <i
                              className="pi pi-times cursor-pointer text-red-400"
                              onClick={() => deleteAttachmentBtn(i.id)}
                            ></i>
                          ) : null}
                        </div>
                      ) : (
                        <>
                          <div className="relative flex w-full flex-col justify-center items-center ">
                            <i className="pi pi-upload cursor-pointer text-xl "></i>
                            <input
                              type="file"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onChange={(e) => FileHandler(e, i.id)}
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
        )}
        {datas.length == 0 && (
          <div className="flex w-1/3">
            <Message text="Data not generated yet" severity="error" />
          </div>
        )}
      </div>

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

      {openData.length === 0 && item.name === "Waiting" ? (
        <>
          <SubmitDialog ref_num={ref_num} />
        </>
      ) : null}
    </React.Fragment>
  );
};

export default RefTable;
