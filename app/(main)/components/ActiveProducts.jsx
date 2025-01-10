"use client";
import DataTable from "@/app/components/ui/DataTable";
import React from "react";
import { Skeleton } from "primereact/skeleton";
import { useActiveProductContext } from "@/app/Context/ActiveProductContext";
import OrderProducts from "./ActiveProducs/OrderProducts";
import NewsProducts from "./ActiveProducs/NewsProducts";

const ActiveProducts = ({ text = "", type = "" }) => {
  const { isLoading } = useActiveProductContext();
  return (
    <div>
      {isLoading === 0 ? (
        <div>
          <Skeleton height="300px" className=" rounded-lg" />
        </div>
      ) : (
        <DataTable text={text}>
          {type === "order" && <OrderProducts />}
          {type === "news" && <NewsProducts />}
        </DataTable>
      )}
    </div>
  );
};

export default ActiveProducts;
