import React from "react";
import WOTable from "./components/WOTable";
import HeaderComponent from "@/app/components/ui/HeaderComponent";

const WOList = () => {
  return (
    <div className="flex flex-col w-full mx-auto pt-7  sm:px-6, lg:px-0 max-w-screen-xl">
      <HeaderComponent
        title="Your Orders"
        breadcrumbs_array={[
          { id: 0, text: "Portal Home /", nav: "/" },
          { id: 1, text: "Orders", nav: "/your-orders" },
        ]}
      />
      <div className="my-3">
        <WOTable />
      </div>
    </div>
  );
};

export default WOList;
