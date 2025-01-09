"use client";
import { useParams } from "next/navigation";
import { ExpatriateListProvider } from "./context/ExpatriateListContext";
import { DependentListProvider } from "./context/DependentListContext";

const ExpatDetailLayout = ({ children }) => {
  const { id } = useParams();
  return (
    <div>
      <main>
        {id === "Expatriate" && (
          <ExpatriateListProvider> {children}</ExpatriateListProvider>
        )}
        {id === "Dependent" && (
          <DependentListProvider>{children}</DependentListProvider>
        )}
      </main>
    </div>
  );
};

export default ExpatDetailLayout;
