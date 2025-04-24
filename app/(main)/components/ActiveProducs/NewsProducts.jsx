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
      {news?.data?.map((item) => (
        <div key={item.id} className="w-full items-center flex p-2 border-b">
          <div className="w-full flex flex-col">
            <span className=" font-[600] text-base text-[#4E80EE] hover:underline cursor-pointer">
              <Link href={item[2799]} target="_blank">
                {item[2796]}
              </Link>
            </span>
            <span className="text-base text-[#919CA7] font-[400] flex gap-[10px] items-center">
              <span>{item[2797]}</span>
              <span className=" text-[20px]">•</span>
              <span>{item[2798]}</span>
            </span>
            <span className="text-xs text-gray-400 flex gap-1 items-center font-bold"></span>
          </div>

          <div className="w-1/2"> {item[674]}</div>
        </div>
      ))}
    </>
  );
};

export default NewsProducts;
