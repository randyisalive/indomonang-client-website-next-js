"use client";
import DataTable from "@/app/components/ui/DataTable";
import React from "react";
import useActiveProductsData from "../hooks/useActiveProductsData";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { Skeleton } from "primereact/skeleton";
import { enquiry_data } from "@/app/function/static_data";
import { useActiveProductContext } from "@/app/Context/ActiveProductContext";

const ActiveProducts = () => {
  const { activeProduct, isLoading, role } = useActiveProductContext();
  return (
    <div>
      {isLoading === 0 ? (
        <div>
          <Skeleton height="300px" className=" rounded-lg" />
        </div>
      ) : (
        <DataTable text="Recent Orders" datas={activeProduct}>
          {activeProduct.map((item) => (
            <div
              key={item.id}
              className="w-full items-center flex p-2 border-b"
            >
              <div className="w-1/3 flex flex-col">
                {item[2134]}
                <span className="text-xs text-gray-400 font-bold">
                  Date Added: {item.date_added}
                </span>
                {role === "Admin" && (
                  <span className="text-xs text-gray-400 font-bold">
                    Created By: {item[309]}
                  </span>
                )}
              </div>
              <div className="w-1/3">
                {enquiry_data
                  .filter((x) => x.text === item[2138])
                  .map((i) => {
                    return (
                      <StatusBadge
                        title={i.text}
                        bg_color={i.bg_color}
                        font_color="white"
                      />
                    );
                  })}
              </div>
              <div className="w-1/3"> {item[674]}</div>
            </div>
          ))}
        </DataTable>
      )}
    </div>
  );
};

export default ActiveProducts;
