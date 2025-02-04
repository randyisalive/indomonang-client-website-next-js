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
  } = useUploadDocumentData();

  const { activeProduct } = useActiveProductContext();
  const wo_data = activeProduct.map((item) => {
    return { ref_num: item.ref_num };
  });
  const [dropdown, setDropdown] = useState(false);
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  return (
    <React.Fragment>
      <div className="mb-3 mx-5 sm:m-0 flex gap-3">
        <SearchBarUpload ref={refForm} handleRef={handleForm} />
        <WebButton onClickFunction={() => getWoBtn()} />
      </div>
      {/* <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-xs text-gray-500 flex gap-1 my-1 mx-5 lg:mx-0"
        >
          {wo_data.length > 0 ? (
            <>
              <span> Ref Number: </span>
              <div className="flex">
                {wo_data.map((item) => {
                  return item.ref_num + ", ";
                })}
              </div>
            </>
          ) : (
            <p className=" text-red-500">
              Order a service to get a reference number
            </p>
          )}
        </motion.div>
      </AnimatePresence> */}
      <CheckWOAuth woData={woData}>
        <AnimatePresence>
          {woData.length > 0 && (
            <>
              <div className="shadow-md mx-5 sm:mx-0 my-10 ">
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
                            Proses
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
                />
              )}
            </>
          )}
        </AnimatePresence>
      </CheckWOAuth>
    </React.Fragment>
  );
};

export default UploadTableComponent;
