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
            <div className="h-full overflow-y-auto w-full">
              {/*  {expat_notis.map((item) => {
                if (item.count > 0) {
                  return (
                    <div
                      className=" text-md mt-3 flex  items-start  p-3 w-full"
                      key={item.id}
                    >
                      <div className="pe-2">
                        <Badge value={item.count} severity="danger" />
                      </div>
                      <div className="w-full relative flex">
                        <div className="flex flex-col">
                          <div className=" flex items-center">
                            <div className="flex">
                              <Link
                                className="text-blue-500 hover:underline cursor-pointer"
                                href={`/admin/account/Vm0wd2QyVkhVWGhUV0docFVtMW9WRll3Wkc5V01WbDNXa1JTVjFKdGVEQmFWVll3VmpGYWMySkVUbHBXVmxwUVZqQmFTMlJIVmtWUmJVWlhWakZLU1ZkV1kzaFRNVWw0V2toT2FGSnRVbGhaYkdSdlpWWmFjMVp0UmxkTlZuQlhWRlpXVjJGSFZuRlJWR3M5/Expatriate/${item.id}`}
                              >
                                {item.name}
                              </Link>
                            </div>
                            <div className=" flex items-center text-xs opacity-50 pt-1">
                              <span className="px-1">•</span>
                              <p className="">Expatriate</p>
                            </div>
                          </div>

                          <span className=" text-xs text-gray-500 opacity-50">
                            <p className=" text-red-500">
                              Your document will expire soon. Please renew or
                              replace them to avoid legal issue
                            </p>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              {dependent_notis.map((item) => {
                if (item.count > 0) {
                  return (
                    <div
                      className=" text-md mt-3 flex  items-start  p-3 w-full"
                      key={item.id}
                    >
                      <div className="pe-2">
                        <Badge value={item.count} severity="danger" />
                      </div>
                      <div className="w-full relative flex">
                        <div className="flex flex-col">
                          <div className=" flex items-center">
                            <div className="flex">
                              <Link
                                className="text-blue-500 hover:underline cursor-pointer"
                                href={`/admin/account/Vm0wd2QyVkhVWGhUV0docFVtMW9WRll3Wkc5V01WbDNXa1JTVjFKdGVEQmFWVll3VmpGYWMySkVUbHBXVmxwUVZqQmFTMlJIVmtWUmJVWlhWakZLU1ZkV1kzaFRNVWw0V2toT2FGSnRVbGhaYkdSdlpWWmFjMVp0UmxkTlZuQlhWRlpXVjJGSFZuRlJWR3M5/Dependent/${item.id}`}
                              >
                                {item.name}
                              </Link>
                            </div>
                            <div className=" flex items-center text-xs opacity-50 pt-1">
                              <span className="px-1">•</span>
                              <p className="">Dependent</p>
                            </div>
                          </div>

                          <span className=" text-xs text-gray-500 opacity-50">
                            <p className=" text-red-500">
                              Your document will expire soon. Please renew or
                              replace them to avoid legal issue
                            </p>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
              {visitors_notis.map((item) => {
                if (item.count > 0) {
                  return (
                    <div
                      className=" text-md mt-3 flex  items-start  p-3 w-full"
                      key={item.id}
                    >
                      <div className="pe-2">
                        <Badge value={item.count} severity="danger" />
                      </div>
                      <div className="w-full relative flex">
                        <div className="flex flex-col">
                          <div className=" flex items-center">
                            <div className="flex">
                              <Link
                                className="text-blue-500 hover:underline cursor-pointer"
                                href={`/admin/account/Vm0wd2QyVkhVWGhUV0docFVtMW9WRll3Wkc5V01WbDNXa1JTVjFKdGVEQmFWVll3VmpGYWMySkVUbHBXVmxwUVZqQmFTMlJIVmtWUmJVWlhWakZLU1ZkV1kzaFRNVWw0V2toT2FGSnRVbGhaYkdSdlpWWmFjMVp0UmxkTlZuQlhWRlpXVjJGSFZuRlJWR3M5/Visitors/${item.id}`}
                              >
                                {item.name}
                              </Link>
                            </div>
                            <div className=" flex items-center text-xs opacity-50 pt-1">
                              <span className="px-1">•</span>
                              <p className="">Visitor</p>
                            </div>
                          </div>

                          <span className=" text-xs text-gray-500 opacity-50">
                            <p className=" text-red-500">
                              Your document will expire soon. Please renew or
                              replace them to avoid legal issue
                            </p>
                          </span>
                        </div>
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
              )} */}
              <ul className="p-3">
                <li>
                  <WebButton />
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
