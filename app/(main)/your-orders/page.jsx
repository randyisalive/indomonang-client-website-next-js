import React, { Suspense } from "react";
import WOTable from "./components/WOTable";
import HeaderComponent from "@/app/components/ui/HeaderComponent";
import { WoDetailProvider } from "./context/WoDetailContext";
import WOSection from "./components/WOSection";
import LoadingScreen from "@/app/components/ui/LoadingScreen";

const WOList = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <div
        className="flex flex-col w-full mx-auto  gap-[24px] "
        style={{ padding: "20px 64px" }}
      >
        <HeaderComponent title="Orders" />
        <WOSection />

        <div className="my-3">
          <WoDetailProvider>
            <WOTable />
          </WoDetailProvider>
        </div>
      </div>
    </Suspense>
  );
};

export default WOList;
