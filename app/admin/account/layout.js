import React from "react";
import { ExpatriateListProvider } from "./[profile]/[id]/context/ExpatriateListContext";
import { DependentListProvider } from "./[profile]/[id]/context/DependentListContext";
import { VisitorsListProvider } from "./[profile]/[id]/context/VisitorsListContext";
import SettingSpan from "./components/SettingSpan";

const AccountLayout = ({ children }) => {
  return (
    <>
      <ExpatriateListProvider>
        <DependentListProvider>
          <VisitorsListProvider>
            <div className="p-3 flex md:hidden justify-between">
              <SettingSpan />
            </div>
            <div className="flex min-h-screen">
              <div className="w-1/3 hidden md:flex flex-col p-24 pe-0">
                <div className="flex  sticky top-20 flex-col gap-1 p-5 border-e-2 w-full">
                  <SettingSpan />
                </div>
              </div>
              <div className="w-full md:w-2/3 py-24  md:p-24">{children}</div>
            </div>
          </VisitorsListProvider>
        </DependentListProvider>
      </ExpatriateListProvider>
    </>
  );
};

export default AccountLayout;
