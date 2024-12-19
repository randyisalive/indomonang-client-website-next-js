import React from "react";
import TableComponent from "../../components/ui/TableComponent";
import BillingTable from "./components/BillingTable";

const invoicePage = () => {
  return (
    <div className="flex flex-col w-full mx-auto pt-7  sm:px-6, lg:px-0 max-w-screen-xl">
      <div className="flex flex-col gap-3">
        <span className="text-5xl font-bold">Billing List</span>

        <ul className="flex gap-2 text-sm text-gray-600">
          <li>Home</li>
          <li>{`>`}</li>
          <li>Billing List</li>
        </ul>
      </div>
      <div className="mt-5">
        <BillingTable />
      </div>
    </div>
  );
};

export default invoicePage;
