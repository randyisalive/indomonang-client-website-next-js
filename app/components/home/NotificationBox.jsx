"use client";
import { useDependentListContext } from "@/app/admin/account/[profile]/[id]/context/DependentListContext";
import { useExpatriateListContext } from "@/app/admin/account/[profile]/[id]/context/ExpatriateListContext";
import { useVisitorsListContext } from "@/app/admin/account/[profile]/[id]/context/VisitorsListContext";
import Link from "next/link";
import { Badge } from "primereact/badge";
import React from "react";

const NotificationBox = () => {
  const { expat_notis } = useExpatriateListContext();
  const { dependent_notis } = useDependentListContext();
  const { visitors_notis } = useVisitorsListContext();

  const all_notis_data = [
    ...expat_notis,
    ...dependent_notis,
    ...visitors_notis,
  ];
  const all_count_notis = all_notis_data.reduce((acc, item) => {
    return acc + item.count;
  }, 0);

  return (
    <div className="  rounded-lg text-sm flex flex-col gap-3 h-96 relative">
      <div className=" font-bold  sticky top-0 z-10">
        <div className=" absolute border rounded-tr-lg p-3 flex items-center gap-1 border-b w-full bg-white shadow-sm">
          <i className="pi pi-bell"></i>
          <span>Expired Documents</span>
          <Badge value={all_count_notis} severity="warning rounded-full" />
        </div>
      </div>
      <div className=" absolute top-10 overflow-y-auto h-96 border rounded-lg w-full">
        {expat_notis.map((item) => {
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
                        Your document will expire soon. Please renew or replace
                        them to avoid legal issue
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
                        Your document will expire soon. Please renew or replace
                        them to avoid legal issue
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
                        Your document will expire soon. Please renew or replace
                        them to avoid legal issue
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            );
          }
        })}
        {all_count_notis === 0 && (
          <div className=" h-full p-5 w-full justify-center flex items-center">
            <div className="flex flex-col justify-center">
              <div className="w-full  flex justify-center">
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/empty-notification-illustration-download-in-svg-png-gif-file-formats--state-no-states-pack-user-interface-illustrations-8593294.png"
                  alt=""
                  width={100}
                />
              </div>

              <span className=" text-center font-bold">
                No Documents Expired
              </span>
              <p className=" text-xs text-center opacity-50 mt-2">
                You have no documents expired right now. Come back later
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationBox;
