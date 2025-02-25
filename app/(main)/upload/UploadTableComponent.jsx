"use client";
import React, { useState } from "react";
import RefTable from "./components/RefTable";
import useUploadDocumentData from "./hooks/useUploadDocumentData";
import SearchBarUpload from "./components/SearcBarUpload";
import WebButton from "@/app/components/ui/WebButton";
import { AnimatePresence, motion } from "framer-motion";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { ProgressSpinner } from "primereact/progressspinner";
import CheckWOAuth from "./components/CheckWOAuth";
import { useActiveProductContext } from "@/app/Context/ActiveProductContext";
import TableComponentNew from "../components/TableComponentNew";
import useUploadDocumentHistory from "./hooks/useUploadDocumentHistory";
import { history_status } from "@/app/function/static_data";
import parse from "html-react-parser";
import { Toast } from "primereact/toast";
import { useUploadDocumentContext } from "./context/UploadDocumentContext";

const UploadTableComponent = () => {
  const {
    wo,
    getWoBtn,
    refForm,
    setRefForm,
    handleForm,
    requiredDocument,
    FilesUploadHandle,
    woData,
    deleteAttachmentBtn,
    handleDownloadUploadedDocuments,
    HistoryHooks,
    toastRef,
  } = useUploadDocumentContext();

  // history hooks
  const { history } = HistoryHooks;

  const [dropdown, setDropdown] = useState(false);
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const [historyToggle, setHistoryToggle] = useState(true);

  return (
    <React.Fragment>
      <Toast ref={toastRef} />
      <div className="mb-3 mx-5 sm:m-0 flex gap-3">
        <SearchBarUpload ref={refForm} handleRef={handleForm} />

        <WebButton onClickFunction={() => getWoBtn()} title="Search" />
      </div>
      <div className="py-2 mx-5 sm:mx-0">
        <span className=" text-xs text-gray-500">
          Enter the reference number for your order
        </span>
      </div>

      <CheckWOAuth woData={woData}>
        <AnimatePresence>
          {woData.length > 0 && (
            <>
              <div className=" mx-5 sm:mx-0 my-3 ">
                <motion.div
                  className="flex  p-3 justify-between items-center border borde-b-0"
                  style={{ backgroundColor: "#f3f4f6" }}
                  onClick={() => handleDropdown()}
                >
                  <span className=" font-bold">WO Details</span>
                </motion.div>

                <table className="min-w-full  rounded-lg text-sm">
                  <tbody>
                    {woData.map((item, index) => (
                      <React.Fragment key={index}>
                        <tr>
                          <td className="border px-4 py-2  w-1/3 font-bold">
                            Reference Number
                          </td>
                          <td className="border px-4 py-2  w-2/3">
                            {item.ref_num}
                          </td>
                        </tr>{" "}
                        <tr>
                          <td className="border px-4 py-2 w-1/3 font-bold">
                            Status
                          </td>
                          <td className="border px-4 py-2 w-2/3">
                            <div className="w-1/12">
                              <StatusBadge
                                title={item.status?.name}
                                bg_color={item.status?.bg_color}
                                font_color="white"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2  w-1/3 font-bold">
                            Name
                          </td>
                          <td className="border px-4 py-2  w-2/3">
                            {item.company}
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2  w-1/3 font-bold">
                            Applicant
                          </td>
                          <td className="border px-4 py-2  w-2/3">
                            {item.applicant}
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2  w-1/3 font-bold">
                            Other Applicants
                          </td>
                          <td className="border px-4 py-2  w-2/3">
                            {parse(item.other_expat_list)}
                            {/*   <ul>
                              {item.other_expat_list
                                ?.split(", ")
                                .slice(0, 3)
                                .map((item, index) => {
                                  return (
                                    <li className="">
                                      {index + 1}. {item}
                                    </li>
                                  );
                                })}
                              {item.other_expat_list?.split(", ").length >
                                5 && (
                                <>
                                  {read_more && (
                                    <>
                                      <ul>
                                        {item.other_expat_list
                                          ?.split(", ")
                                          .slice(
                                            3,
                                            item.other_expat_list.split(", ")
                                              .length
                                          )
                                          .map((item, index) => {
                                            return (
                                              <li className="">
                                                {index + 4}. {item}
                                              </li>
                                            );
                                          })}
                                      </ul>
                                    </>
                                  )}
                                  <span
                                    className="text-blue-500 hover:underline cursor-pointer"
                                    onClick={() => setReadMore(!read_more)}
                                  >
                                    {!read_more && <>Read more</>}
                                    {read_more && <>Read less</>}
                                  </span>
                                </>
                              )}
                            </ul> */}
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2  w-1/3 font-bold">
                            Process
                          </td>
                          <td className="border px-4 py-2 w-2/3">
                            {item.service}
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2  w-1/3 font-bold">
                            City / Country
                          </td>
                          <td className="border px-4 py-2  w-2/3">
                            {item.city}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
              {requiredDocument.length > 0 ? (
                <div className="w-full p-3 items-center justify-center">
                  <ProgressSpinner />
                </div>
              ) : (
                <RefTable
                  ref_num={refForm}
                  datas={requiredDocument.data}
                  item={requiredDocument.parent}
                  isLoading={requiredDocument.isLoading}
                  FileHandler={FilesUploadHandle}
                  deleteAttachmentBtn={deleteAttachmentBtn}
                  handleDownloadUploadedDocuments={
                    handleDownloadUploadedDocuments
                  }
                  commen_data={history}
                />
              )}
              {history.length > 0 && (
                <div className="my-5 mx-5">
                  <span
                    className="w-full flex my-3 text-lg border-b items-center gap-2 cursor-pointer "
                    onClick={() => setHistoryToggle(!historyToggle)}
                  >
                    History
                    <motion.i
                      initial={{ rotate: 0 }}
                      animate={historyToggle ? { rotate: 90 } : { rotate: 0 }}
                      exit={{ rotate: 0 }}
                      className={`pi pi-angle-right `}
                    ></motion.i>
                  </span>
                  <AnimatePresence mode="wait">
                    {historyToggle && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={
                          historyToggle ? { height: "1200px" } : { height: 0 }
                        }
                        exit={{ height: 0 }}
                        className="overflow-y-auto"
                      >
                        <TableComponentNew
                          title=""
                          numbering={true}
                          columns={[
                            {
                              header: "Description",
                              render: (row) => {
                                return (
                                  <>
                                    <div className="flex flex-col gap-3 text-xs">
                                      <ul className="flex flex-col gap-1">
                                        <li>
                                          <strong>{row[3230]}</strong>
                                        </li>
                                        <li>{parse(row[3229])}</li>
                                        <li>
                                          {history_status
                                            .filter((i) => i.text === row[3228])
                                            .map((x) => {
                                              return (
                                                <StatusBadge
                                                  title={x.text}
                                                  bg_color={x.bg_color}
                                                  font_color="white"
                                                />
                                              );
                                            })}
                                        </li>
                                      </ul>
                                    </div>
                                  </>
                                );
                              },
                            },
                            { header: "Date", key: "date_added" },
                          ]}
                          data={history}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </>
          )}
        </AnimatePresence>
      </CheckWOAuth>
    </React.Fragment>
  );
};

export default UploadTableComponent;
