"use client";
import React, { useState } from "react";
import RefTable from "./components/RefTable";
import useUploadDocumentData from "./hooks/useUploadDocumentData";
import SearchBarUpload from "./components/SearcBarUpload";
import WebButton from "@/app/components/ui/WebButton";
import { AnimatePresence, motion } from "framer-motion";
import JsonDisplay from "@/app/components/ui/JsonDisplay";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { ProgressSpinner } from "primereact/progressspinner";
import CheckWOAuth from "./components/CheckWOAuth";

const UploadTableComponent = () => {
  const {
    woData,
    getWoBtn,
    refForm,
    setRefForm,
    handleForm,
    requiredDocument,
    FilesUploadHandle,
    deleteAttachmentBtn,
  } = useUploadDocumentData();

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
                            {item.refNum}
                          </td>
                        </tr>
                        <tr>
                          <td className="border px-4 py-2  w-1/3 font-bold">
                            Name
                          </td>
                          <td className="border px-4 py-2  w-2/3">
                            {item.name}
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
                            {item.process}
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
                                title={item.status.title}
                                bg_color={item.status.color}
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
