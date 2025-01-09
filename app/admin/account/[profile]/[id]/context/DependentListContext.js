"use client";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import React, { createContext, useContext } from "react";
import useDependentListData from "../hooks/useDependentListData";

// Create the context
const DependentListContext = createContext();

// Define a provider component
export const DependentListProvider = ({ children }) => {
  const { dependent } = useDependentListData(141);
  return (
    <DependentListContext.Provider
      value={{
        dependent,
      }}
    >
      {children}
    </DependentListContext.Provider>
  );
};

// Create a custom hook to use the AccountContext
export const useDependentListContext = () => {
  return useContext(DependentListContext);
};

export default DependentListContext;
