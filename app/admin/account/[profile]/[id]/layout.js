"use client";
import React from "react";
import { useParams } from "next/navigation";
import { ExpatriateListProvider } from "./context/ExpatriateListContext";
import { DependentListProvider } from "./context/DependentListContext";
import { VisitorsListProvider } from "./context/VisitorsListContext";
import { CompanyDocumentProvider } from "./context/CompanyDocumentContext";

const ExpatDetailLayout = ({ children }) => {
  return (
    <div>
      <main>
        <CompanyDocumentProvider>
          <ExpatriateListProvider>
            <DependentListProvider>
              <VisitorsListProvider>{children}</VisitorsListProvider>
            </DependentListProvider>
          </ExpatriateListProvider>
        </CompanyDocumentProvider>
      </main>
    </div>
  );
};

export default ExpatDetailLayout;
