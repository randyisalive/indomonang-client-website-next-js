import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import { useRecentNewsContext } from "@/app/Context/RecentNewsContext";
import { enquiry_data } from "@/app/function/static_data";
import Link from "next/link";
import React from "react";

const NewsProducts = () => {
  const { news } = useRecentNewsContext();
  const { role } = useAccountDataContext();

  return (
    <>
      {news.map((item) => (
        <div key={item.id} className="w-full items-center flex p-2 border-b">
          <div className="w-1/2 flex flex-col">
            <span className=" font-bold text-blue-500 hover:underline cursor-pointer">
              <Link href={item[2799]} target="_blank">
                {" "}
                {item[2796]}
              </Link>
            </span>
            <span className="text-xs text-gray-400 font-bold flex gap-1 items-center">
              <i className="pi pi-clock text-xs "></i> {item[2798]}
            </span>
            <span className="text-xs text-gray-400 flex gap-1 items-center font-bold">
              <i className="pi pi-user text-xs"></i> {item[2797]}
            </span>
          </div>

          <div className="w-1/2"> {item[674]}</div>
        </div>
      ))}
    </>
  );
};

export default NewsProducts;
