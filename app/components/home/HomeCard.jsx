"use client";
import { useRouter } from "next/navigation";
import React from "react";

const HomeCard = () => {
  const card_data = [
    { id: 0, icon: "pi pi-times", count: "2", sub: "Layanan", link: "" },
    { id: 1, icon: "pi pi-times", count: "1", sub: "Domain", link: "" },
    {
      id: 2,
      icon: "pi pi-times",
      count: "0",
      sub: "Unpaid Invoices",
      link: "",
    },
    { id: 3, icon: "pi pi-times", count: "0", sub: "", link: "" },
  ];
  const nav = useRouter();
  return (
    <>
      {card_data.map((item) => {
        return (
          <>
            <div
              key={`homeCard-${item.id}`}
              className="border  flex gap-3 flex-col w-44 h-44 rounded-lg"
              onClick={() => nav.push(`${item.link}`)}
            >
              <span className="w-full text-end p-2">
                <i className={`${item.icon}`}></i>
              </span>
              <div className="h-full gap-2 flex-col flex  items-center w-full text-end">
                <p className="text-6xl text-blue-800">{item.count}</p>
                <p>{item.sub}</p>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};

export default HomeCard;
