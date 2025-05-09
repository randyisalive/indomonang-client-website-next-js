"use client";
import { AccountSettingProvider } from "@/app/admin/context/AccountSettingContext";
import HeaderComponent from "@/app/components/ui/HeaderComponent";
import React, { Suspense } from "react";
import DocumentRecordCard from "./components/DocumentRecordCard";
import { ExpatriateListProvider } from "@/app/admin/account/[profile]/[id]/context/ExpatriateListContext";
import { DependentListProvider } from "@/app/admin/account/[profile]/[id]/context/DependentListContext";
import { VisitorsListProvider } from "@/app/admin/account/[profile]/[id]/context/VisitorsListContext";
import LoadingScreen from "@/app/components/ui/LoadingScreen";

const RecordPage = () => {
  return (
    <AccountSettingProvider>
      <ExpatriateListProvider>
        <DependentListProvider>
          <VisitorsListProvider>
            <Suspense fallback={<LoadingScreen />}>
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
            </Suspense>
          </VisitorsListProvider>
        </DependentListProvider>
      </ExpatriateListProvider>
    </AccountSettingProvider>
  );
};

export default RecordPage;
