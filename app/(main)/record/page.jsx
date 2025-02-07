import { AccountSettingProvider } from "@/app/admin/context/AccountSettingContext";
import HeaderComponent from "@/app/components/ui/HeaderComponent";
import React from "react";
import DocumentRecordCard from "./components/DocumentRecordCard";
import PrintSection from "./components/PrintSection";
import { ExpatriateListProvider } from "@/app/admin/account/[profile]/[id]/context/ExpatriateListContext";
import { DependentListProvider } from "@/app/admin/account/[profile]/[id]/context/DependentListContext";
import { VisitorsListProvider } from "@/app/admin/account/[profile]/[id]/context/VisitorsListContext";

const RecordPage = () => {
  return (
    <AccountSettingProvider>
      <ExpatriateListProvider>
        <DependentListProvider>
          <VisitorsListProvider>
            <div className="flex flex-col w-full mx-auto pt-7  sm:px-6, lg:px-0 max-w-screen-xl">
              <HeaderComponent
                title="Document Records"
                breadcrumbs_array={[
                  { id: 0, text: "Portal Home /", nav: "/" },
                  { id: 1, text: "Record", nav: "/record" },
                ]}
              />
              <DocumentRecordCard />
            </div>
          </VisitorsListProvider>
        </DependentListProvider>
      </ExpatriateListProvider>
    </AccountSettingProvider>
  );
};

export default RecordPage;
