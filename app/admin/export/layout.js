import React from "react";
import { ExpatriateListProvider } from "../account/[profile]/[id]/context/ExpatriateListContext";
import { DependentListProvider } from "../account/[profile]/[id]/context/DependentListContext";
import { AccountSettingProvider } from "../context/AccountSettingContext";
import { VisitorsListProvider } from "../account/[profile]/[id]/context/VisitorsListContext";

const exportLayout = ({ children }) => {
  return (
    <div className="p-3">
      <AccountSettingProvider>
        <ExpatriateListProvider>
          <DependentListProvider>
            <VisitorsListProvider>{children}</VisitorsListProvider>
          </DependentListProvider>
        </ExpatriateListProvider>
      </AccountSettingProvider>
    </div>
  );
};

export default exportLayout;
