import React, { Suspense } from "react";
import BillingTable from "./components/BillingTable";
import HeaderComponent from "@/app/components/ui/HeaderComponent";

const invoicePage = () => {
  return (
    <div className="flex flex-col w-full gap-[24px]">
      <div className="flex px-[64px] ">
        <HeaderComponent title="Billing List" />
      </div>

      <BillingTable />
    </div>
  );
};

export default invoicePage;
