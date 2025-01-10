"use client";
import { useParams } from "next/navigation";
import { ExpatriateListProvider } from "./context/ExpatriateListContext";
import { DependentListProvider } from "./context/DependentListContext";
import { VisitorsListProvider } from "./context/VisitorsListContext";

const ExpatDetailLayout = ({ children }) => {
  const { id } = useParams();
  return (
    <div>
      <main>
        <ExpatriateListProvider>
          <DependentListProvider>
            <VisitorsListProvider>{children}</VisitorsListProvider>
          </DependentListProvider>
        </ExpatriateListProvider>
      </main>
    </div>
  );
};

export default ExpatDetailLayout;
