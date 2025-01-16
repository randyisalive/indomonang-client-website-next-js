import HeaderComponent from "@/app/components/ui/HeaderComponent";
import TableComponent from "@/app/components/ui/TableComponent";
import React from "react";
import InvoiceTables from "./components/InvoiceTables";

const invoicePage = () => {
  return (
    <div className="flex flex-col w-full mx-auto pt-7  sm:px-6, lg:px-0 max-w-screen-xl">
      <HeaderComponent
        title="Payment History"
        breadcrumbs_array={[
          { id: 0, text: "Portal Home /", nav: "/" },
          { id: 1, text: "Payment History", nav: "/invoice" },
        ]}
      />
      <div className="mt-5">
        <InvoiceTables />
      </div>
    </div>
  );
};

export default invoicePage;
