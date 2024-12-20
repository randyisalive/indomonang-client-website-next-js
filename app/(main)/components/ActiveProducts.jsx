"use client";
import DataTable from "@/app/components/ui/DataTable";
import React from "react";
import useActiveProductsData from "../hooks/useActiveProductsData";
import StatusBadge from "@/app/components/ui/tableComponent/StatusBadge";
import { Skeleton } from "primereact/skeleton";

const ActiveProducts = () => {
  const { activeProduct, isLoading } = useActiveProductsData();
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
                {" "}
                {item[2134]}
                <span className="text-xs text-gray-400 font-bold">
                  Date Added: {item.date_added}
                </span>
              </div>
              <div className="w-1/3">
                <StatusBadge title={item[2138]} />
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
