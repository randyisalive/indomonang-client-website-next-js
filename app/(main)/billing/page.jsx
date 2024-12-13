import React from "react";
import TableComponent from "../../components/ui/TableComponent";

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
      <div className="flex flex-col gap-3">
        <span className="text-5xl font-bold">Billing List</span>

        <ul className="flex gap-2 text-sm text-gray-600">
          <li>Home</li>
          <li>{`>`}</li>
          <li>Billing List</li>
        </ul>
      </div>
      <div className="mt-5">
        <TableComponent th_array={th_array} datas={td_array} />
      </div>
    </div>
  );
};

export default invoicePage;
