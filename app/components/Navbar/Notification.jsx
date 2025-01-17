"use client";
import React, { useEffect, useRef, useState } from "react";
import { useExpatriateListContext } from "@/app/admin/account/[profile]/[id]/context/ExpatriateListContext";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "primereact/badge";
import { Message } from "primereact/message";
import Link from "next/link";

const Notification = () => {
  const cm = useRef(null);
  const { expat_notis, expatriates } = useExpatriateListContext();

  const [isOpen, setIsOpen] = useState(false);

  const all_count_notis = expat_notis.reduce((acc, item) => {
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

  return (
    <div className=" relative w-full flex">
      <i
        className="pi pi-bell text-xl p-overlay-badge text-gray-800 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {all_count_notis > 0 && (
          <Badge severity="warning" value={all_count_notis} />
        )}
      </i>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card flex flex-col min-w-96 h-96 z-10 md:items-center shadow-md rounded-xl overflow-y-auto top-full right-0 absolute text-sm bg-white"
          >
            <div className="font-bold flex w-full justify-between p-3 border-b">
              Notifications
            </div>
            {expat_notis.map((item) => {
              if (item.count > 0) {
                return (
                  <div className=" text-md mt-3 flex border items-center  p-3 w-full">
                    <div className="pe-2">
                      <Badge value={item.count} severity="danger" />
                    </div>
                    <div className="w-full relative flex">
                      <div className="flex flex-col">
                        <Link
                          className="text-blue-500 hover:underline cursor-pointer"
                          href={`/admin/account/Vm0wd2QyVkhVWGhUV0docFVtMW9WRll3Wkc5V01WbDNXa1JTVjFKdGVEQmFWVll3VmpGYWMySkVUbHBXVmxwUVZqQmFTMlJIVmtWUmJVWlhWakZLU1ZkV1kzaFRNVWw0V2toT2FGSnRVbGhaYkdSdlpWWmFjMVp0UmxkTlZuQlhWRlpXVjJGSFZuRlJWR3M5/Expatriate/${item.id}`}
                        >
                          {item.name}
                        </Link>
                        <span className=" text-xs text-gray-500 opacity-50">
                          Expatriates
                        </span>
                      </div>

                      <span className="px-1">•</span>
                      <p className=" text-red-500">Need Attention!</p>
                    </div>
                  </div>
                );
              }
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
