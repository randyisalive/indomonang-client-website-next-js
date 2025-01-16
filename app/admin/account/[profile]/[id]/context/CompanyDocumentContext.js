"use client";
import React, { createContext, useContext } from "react";
import useDependentListData from "../hooks/useDependentListData";
import useCompanyDocumentData from "../hooks/useCompanyDocumentData";

// Create the context
const CompanyDocumentContext = createContext();

// Define a provider component
export const CompanyDocumentProvider = ({ children }) => {
  const { documentData } = useCompanyDocumentData();
  return (
    <CompanyDocumentContext.Provider
      value={{
        documentData,
      }}
    >
      {children}
    </CompanyDocumentContext.Provider>
  );
};

// Create a custom hook to use the AccountContext
export const useCompanyDocumentContext = () => {
  return useContext(CompanyDocumentContext);
};

export default CompanyDocumentContext;
