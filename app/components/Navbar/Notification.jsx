"use client";
import React, { useEffect, useRef, useState } from "react";
import { useExpatriateListContext } from "@/app/admin/account/[profile]/[id]/context/ExpatriateListContext";
import { AnimatePresence, motion } from "framer-motion";
import { Badge } from "primereact/badge";
import Link from "next/link";
import { useDependentListContext } from "@/app/admin/account/[profile]/[id]/context/DependentListContext";
import { useVisitorsListContext } from "@/app/admin/account/[profile]/[id]/context/VisitorsListContext";

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
            <div className="h-full overflow-y-auto w-full">
              {expat_notis.map((item) => {
                if (item.count > 0) {
                  return (
                    <div
                      className=" text-md mt-3 flex  items-center  p-3 w-full"
                      key={item.id}
                    >
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
              {dependent_notis.map((item) => {
                if (item.count > 0) {
                  return (
                    <div
                      className=" text-md mt-3 flex  items-center  p-3 w-full"
                      key={item.id}
                    >
                      <div className="pe-2">
                        <Badge value={item.count} severity="danger" />
                      </div>
                      <div className="w-full relative flex">
                        <div className="flex flex-col">
                          <Link
                            className="text-blue-500 hover:underline cursor-pointer"
                            href={`/admin/account/Vm0wd2QyVkhVWGhUV0docFVtMW9WRll3Wkc5V01WbDNXa1JTVjFKdGVEQmFWVll3VmpGYWMySkVUbHBXVmxwUVZqQmFTMlJIVmtWUmJVWlhWakZLU1ZkV1kzaFRNVWw0V2toT2FGSnRVbGhaYkdSdlpWWmFjMVp0UmxkTlZuQlhWRlpXVjJGSFZuRlJWR3M5/Dependent/${item.id}`}
                          >
                            {item.name}
                          </Link>
                          <span className=" text-xs text-gray-500 opacity-50">
                            Dependent
                          </span>
                        </div>

                        <span className="px-1">•</span>
                        <p className=" text-red-500">Need Attention!</p>
                      </div>
                    </div>
                  );
                }
              })}{" "}
              {visitors_notis.map((item) => {
                if (item.count > 0) {
                  return (
                    <div
                      className=" text-md mt-3 flex  items-center  p-3 w-full"
                      key={item.id}
                    >
                      <div className="pe-2">
                        <Badge value={item.count} severity="danger" />
                      </div>
                      <div className="w-full relative flex">
                        <div className="flex flex-col">
                          <Link
                            className="text-blue-500 hover:underline cursor-pointer"
                            href={`/admin/account/Vm0wd2QyVkhVWGhUV0docFVtMW9WRll3Wkc5V01WbDNXa1JTVjFKdGVEQmFWVll3VmpGYWMySkVUbHBXVmxwUVZqQmFTMlJIVmtWUmJVWlhWakZLU1ZkV1kzaFRNVWw0V2toT2FGSnRVbGhaYkdSdlpWWmFjMVp0UmxkTlZuQlhWRlpXVjJGSFZuRlJWR3M5/Visitors/${item.id}`}
                          >
                            {item.name}
                          </Link>
                          <span className=" text-xs text-gray-500 opacity-50">
                            Visitor
                          </span>
                        </div>

                        <span className="px-1">•</span>
                        <p className=" text-red-500">Need Attention!</p>
                      </div>
                    </div>
                  );
                }
              })}
              {all_count_notis === 0 && (
                <div className=" h-full w-full justify-center flex items-center">
                  <div className="flex flex-col justify-center">
                    <div className="w-full  flex justify-center">
                      <img
                        src="https://cdni.iconscout.com/illustration/premium/thumb/empty-notification-illustration-download-in-svg-png-gif-file-formats--state-no-states-pack-user-interface-illustrations-8593294.png"
                        alt=""
                        width={100}
                      />
                    </div>

                    <span className=" text-center font-bold">
                      No Notification Yet
                    </span>
                    <p className=" text-xs text-center opacity-50 mt-2">
                      You have no notifications right now. Come back later
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
