import {
  AccountSettingProvider,
  useAccountSettingContext,
} from "@/app/admin/context/AccountSettingContext";
import HomeCard from "@/app/components/home/HomeCard";
import HeaderComponent from "@/app/components/ui/HeaderComponent";
import React from "react";
import DocumentRecordCard from "./components/DocumentRecordCard";

const RecordPage = () => {
  const data = [{ id: 0, sub: "Expatriate", count: 10, link: "/" }];

  return (
    <AccountSettingProvider>
      <div className="flex flex-col w-full mx-auto pt-7  sm:px-6, lg:px-0 max-w-screen-xl">
        <HeaderComponent
          title="Document Records"
          breadcrumbs_array={[
            { id: 0, text: "Portal Home /", nav: "/" },
            { id: 1, text: "Record", nav: "/record" },
          ]}
        />
      </div>
      <DocumentRecordCard />
    </AccountSettingProvider>
  );
};

export default RecordPage;
