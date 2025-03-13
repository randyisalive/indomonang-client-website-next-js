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
    <div className="rounded-lg text-sm flex flex-col gap-3 relative">
      <div className=" font-bold  sticky z-10">
        <div
          className=" absolute border rounded-tl-xl rounded-tr-xl  flex items-center  w-full bg-white "
          style={{ gap: "10px", padding: "24px 12px" }}
        >
          <i className="pi pi-bell text-xl" style={{ color: "#F6565F" }}></i>
          <span className=" font-semibold" style={{ fontSize: "20px" }}>
            Expired Documents
          </span>
        </div>
      </div>
      <div
        className=" relative pt-14 bg-white overflow-y-auto border rounded-lg w-full "
        style={{ height: "760px" }}
      >
        {all_notis_data.map((item) => {
          if (item.count > 0) {
            return (
              <div
                className=" text-md mt-3 flex border-b  items-start  p-3 w-full"
                key={item.id}
              >
                <div className="pe-2">
                  <Badge value={item.count} severity="danger" />
                </div>
                <div className="w-full relative flex">
                  <div className="flex flex-col">
                    <div className=" flex items-center" style={{ gap: "8px" }}>
                      <div className="flex">
                        <Link
                          style={{ color: "#4E80EE" }}
                          className=" hover:underline cursor-pointer font-semibold"
                          href={`/admin/account/Vm0wd2QyVkhVWGhUV0docFVtMW9WRll3Wkc5V01WbDNXa1JTVjFKdGVEQmFWVll3VmpGYWMySkVUbHBXVmxwUVZqQmFTMlJIVmtWUmJVWlhWakZLU1ZkV1kzaFRNVWw0V2toT2FGSnRVbGhaYkdSdlpWWmFjMVp0UmxkTlZuQlhWRlpXVjJGSFZuRlJWR3M5/Expatriate/${item.id}`}
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div className=" flex items-center text-xs opacity-50 pt-1">
                        <span
                          className=" rounded-full"
                          style={{
                            width: "6px",
                            height: "6px",
                            backgroundColor: "#EAEAEA",
                          }}
                        ></span>
                      </div>{" "}
                      <p className="">Expatriate</p>
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
