import HeaderComponent from "@/app/components/ui/HeaderComponent";
import React from "react";
import QuotationTable from "./components/QuotationTable";

const QuotationsPage = () => {
  return (
    <div className="flex flex-col w-full mx-auto pt-7  sm:px-6, lg:px-0 max-w-screen-xl">
      <HeaderComponent
        title="Quotations"
        breadcrumbs_array={[
          { id: 0, text: "Portal Home /", nav: "/" },
          { id: 1, text: "Quotations", nav: "/quotations" },
        ]}
      />

      <div className="">
        <QuotationTable />
      </div>
    </div>
  );
};

export default QuotationsPage;
