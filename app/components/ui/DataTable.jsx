"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import StatusBadge from "./tableComponent/StatusBadge";
import Link from "next/link";

const DataTable = ({ datas = [], text = "", children, type = "order" }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="flex flex-col text-sm w-full border-gray-300 border rounded-t-lg">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gray-100 border-b cursor-pointer flex p-2 py-3 items-center rounded-t-lg justify-between"
        >
          <span className="font-bold text-lg">{text}</span>
          <div className="flex items-center gap-2">
            {type === "order" && (
              <Link
                href={"/your-orders"}
                onClick={(e) => e.stopPropagation()}
                className=" hover:underline text-blue-500 text-xs"
              >
                View All
              </Link>
            )}

            <motion.i
              initial={{ rotate: 0 }}
              animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
              className={`pi pi-angle-right text-xs text-blue-500`}
            ></motion.i>
          </div>
        </div>
        <motion.div
          initial={{ height: 0 }}
          animate={isOpen ? { height: "auto" } : { height: 0 }}
          exit={{ height: 0 }}
          className="flex flex-col gap-2 overflow-y-hidden"
        >
          {children}
        </motion.div>
      </div>
    </>
  );
};

export default DataTable;
