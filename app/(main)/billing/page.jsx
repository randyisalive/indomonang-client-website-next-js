import React from "react";
import BillingTable from "./components/BillingTable";
import HeaderComponent from "@/app/components/ui/HeaderComponent";

const invoicePage = () => {
  return (
    <div className="flex flex-col w-full mx-auto pt-7  sm:px-6, lg:px-0 max-w-screen-xl">
      <HeaderComponent
        title="Billing List"
        breadcrumbs_array={[
          { id: 0, text: "Portal Home /", nav: "/" },
          { id: 1, text: "Billing", nav: "/billing" },
        ]}
      />
      <div className="mt-5">
        <BillingTable />
      </div>
    </div>
  );
};

export default invoicePage;
