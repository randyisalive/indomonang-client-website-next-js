"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import StatusBadge from "./tableComponent/StatusBadge";
import Link from "next/link";

const DataTable = ({ datas = [], text = "", children, type = "order" }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="flex flex-col h-full text-sm w-full border-gray-300 border rounded-t-lg">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="border-b cursor-pointer flex  items-center rounded-t-lg justify-between"
          style={{ padding: "24px 12px" }}
        >
          <div className="flex items-center " style={{ gap: "10px" }}>
            <i
              className="pi pi-receipt"
              style={{ fontSize: "23px", color: "#F3AB00" }}
            ></i>
            <span className="font-semibold " style={{ fontSize: "20px" }}>
              {text}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {type === "order" && (
              <Link
                href={"/your-orders"}
                onClick={(e) => e.stopPropagation()}
                className=" hover:underline font-semibold"
                style={{ color: "#4E80EE" }}
              >
                View All
              </Link>
            )}
          </div>
        </div>
        <motion.div
          initial={{ height: 0 }}
          animate={isOpen ? { height: "auto" } : { height: 0 }}
          exit={{ height: 0 }}
          className="flex flex-col  overflow-y-hidden"
        >
          {children}
        </motion.div>
      </div>
    </>
  );
};

export default DataTable;
