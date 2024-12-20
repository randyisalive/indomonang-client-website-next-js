"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import StatusBadge from "./tableComponent/StatusBadge";

const DataTable = ({ datas = [], text = "", children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="flex flex-col text-sm w-full border-gray-300 border rounded-t-lg">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-100 border-b cursor-pointer flex p-2 py-3 items-center rounded-t-lg justify-between"
        >
          <span className="font-bold">{text}</span>
          <motion.i
            initial={{ rotate: 0 }}
            animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
            className={`pi pi-angle-right`}
          ></motion.i>
        </div>
        <motion.div
          initial={{ height: 0 }}
          animate={isOpen ? { height: "auto" } : { height: 0 }}
          exit={{ height: 0 }}
          className="flex flex-col gap-2 overflow-y-hidden"
        >
          {datas.length > 0 ? (
            <>{children}</>
          ) : (
            <div className="w-full text-sm p-2 border-b h-52 flex justify-center items-center">
              No {text}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default DataTable;
