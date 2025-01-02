import HeaderComponent from "@/app/components/ui/HeaderComponent";
import TableComponent from "@/app/components/ui/TableComponent";
import React from "react";

const invoicePage = () => {
  const th_array = [
    "No",
    "Reference Number",
    "Status",
    "Date of Payment",
    "Amount of Payment",
    "Outstanding Balance",
    "Action",
  ];
  const td_array = [
    {
      id: 0,
      ref_num: "2DCGE",
      status_name: "Open",
      date: "Monday",
      payment: "Rp. 10.000 -,",
      outstanding: "Rp. 50.000 -,",
    },
  ];
  return (
    <div className="flex flex-col w-full mx-auto pt-7  sm:px-6, lg:px-0 max-w-screen-xl">
      <HeaderComponent
        title="Invoices"
        breadcrumbs_array={[
          { id: 0, text: "Portal Home /", nav: "/" },
          { id: 1, text: "Invoice", nav: "/invoice" },
        ]}
      />
      <div className="mt-5">
        <TableComponent
          th_array={th_array}
          datas={td_array}
          TableType="invoice"
        />
      </div>
    </div>
  );
};

export default invoicePage;
