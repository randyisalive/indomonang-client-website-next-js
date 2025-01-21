import React from "react";
import { ExpatriateListProvider } from "../account/[profile]/[id]/context/ExpatriateListContext";
import { DependentListProvider } from "../account/[profile]/[id]/context/DependentListContext";

const exportLayout = ({ children }) => {
  return (
    <div className="p-3">
      <ExpatriateListProvider>
        <DependentListProvider>{children}</DependentListProvider>
      </ExpatriateListProvider>
    </div>
  );
};

export default exportLayout;
