"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WebButton from "@/app/components/ui/WebButton";
import { Message } from "primereact/message";

const TextAreaTicket = ({
  SubmitMessage = () => {},
  handleForm = () => {},
  attachments = [],
  handleAttachments = () => {},
  deleteAttachment = () => {},
  handleMouseEnter = () => {},
  handleMouseLeave = () => {},
  handleRemoveAttachment = () => {},
  errorMsg = "",
}) => {
  const [parentInput, setParentInput] = useState(false);

  return (
    <div className="flex gap-3">
      {!parentInput && (
        <motion.div
          onClick={() => setParentInput(true)}
          whileTap={{ scale: 0.889 }}
          className="p-2 flex gap-2 cursor-pointer items-center bg-gray-100 rounded-full border"
        >
          <i className="pi pi-comment text-gray-500"></i>
          <p className="text-sm font-light text-gray-500">Add Response</p>
        </motion.div>
      )}
      <AnimatePresence>
        {parentInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col w-full gap-2 "
          >
            <div className="w-full relative flex items-center justify-center">
              <textarea
                name="text"
                onChange={(e) => handleForm(e)}
                className="pl-2 resize-none py-2 border-2 h-40 focus:border-blue-500 focus:outline-none w-full"
              />
              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className=" absolute"
                  >
                    <Message severity="error" text={errorMsg} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex gap-2 justify-between ">
              <div className="flex items-center gap-3 ">
                <ol className="flex gap-3">
                  <li className="relative ">
                    <motion.i
                      whileTap={{ scale: 0.889 }}
                      className="pi pi-paperclip  text-lg text-gray-500"
                    ></motion.i>
                    <motion.input
                      type="file"
                      onChange={(e) => handleAttachments(e)}
                      name="attachments"
                      accept="image/jpeg, image/png, .pdf"
                      className="absolute  left-0 w-full opacity-0"
                    />
                  </li>
                </ol>
                <AnimatePresence>
                  {attachments.data.length > 0 && (
                    <div>
                      <motion.i
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        whileTap={{ scale: 0.889 }}
                        onClick={() => {
                          handleRemoveAttachment();
                        }}
                        className="pi pi-trash text-red-500 cursor-pointer"
                      ></motion.i>
                    </div>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <WebButton title="Post" onClickFunction={SubmitMessage} />
              </div>
            </div>

            <div>
              <ul className="text-xs text-gray-500 flex flex-col gap-2">
                {attachments.data.map((attachment, index) => (
                  <li
                    key={attachment.data.name}
                    className="border-b w-8/12 flex gap-2 items-center p-1 "
                  >
                    <motion.div
                      whileHover={{ color: "#dc2626 " }}
                      className="flex items-center gap-2 cursor-pointer text-blue-500 hover:text-red-600"
                      onClick={() => deleteAttachment(index)}
                    >
                      {attachment.filetype.split("/")[0] == "image" && (
                        <img src={attachment.data} width={50} />
                      )}
                      {attachment.delete && (
                        <i className="pi pi-times text-red-600"></i>
                      )}
                      {!attachment.delete && <i className="pi pi-file"></i>}
                      <p className=" hover:text-red-600">{attachment.name}</p>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TextAreaTicket;
