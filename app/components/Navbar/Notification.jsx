"use client";
import React, { useEffect, useRef, useState } from "react";
import { useExpatriateListContext } from "@/app/admin/account/[profile]/[id]/context/ExpatriateListContext";
import { AnimatePresence, motion } from "framer-motion";
import { useDependentListContext } from "@/app/admin/account/[profile]/[id]/context/DependentListContext";
import { useVisitorsListContext } from "@/app/admin/account/[profile]/[id]/context/VisitorsListContext";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import WebButton from "../ui/WebButton";

const Notification = () => {
  const cm = useRef(null);
  const { expat_notis } = useExpatriateListContext();
  const { dependent_notis } = useDependentListContext();
  const { visitors_notis } = useVisitorsListContext();

  const [isOpen, setIsOpen] = useState(false);
  const all_notis_data = [
    ...expat_notis,
    ...dependent_notis,
    ...visitors_notis,
  ];
  const all_count_notis = all_notis_data.reduce((acc, item) => {
    return acc + item.count;
  }, 0);

  // click outside event
  const cardRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cardRef, isOpen, cm]);

  const { accounts } = useAccountDataContext();

  return (
    <div className=" relative w-full justify-end flex   ">
      <div
        className="flex gap-1 items-center p-2 cursor-pointer  w-full justify-end "
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>{accounts.username}</p>
        <i className="pi pi-angle-right"></i>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card flex flex-col min-w-full h-96 z-10 md:items-center shadow-md rounded-xl overflow-y-auto top-full right-0 absolute text-sm bg-white"
          >
            <div className="font-bold flex w-full justify-between p-3 border-b">
              Actions
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
