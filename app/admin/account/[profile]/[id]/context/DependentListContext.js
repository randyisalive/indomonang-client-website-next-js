"use client";
import React, { createContext, useContext } from "react";
import useDependentListData from "../hooks/useDependentListData";

// Create the context
const DependentListContext = createContext();

// Define a provider component
export const DependentListProvider = ({ children }) => {
  const { dependent, dependent_notis } = useDependentListData();
  return (
    <DependentListContext.Provider
      value={{
        dependent,
        dependent_notis,
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
