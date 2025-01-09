"use client";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import React, { createContext, useContext } from "react";
import useExpatriateListData from "../hooks/useExpatriateListData";

// Create the context
const ExpatriateListContext = createContext();

// Define a provider component
export const ExpatriateListProvider = ({ children }) => {
  const { accounts, isLoading } = useAccountDataContext();

  const { expatriates } = useExpatriateListData(accounts.company_id);

  return (
    <ExpatriateListContext.Provider
      value={{
        expatriates,
      }}
    >
      {children}
    </ExpatriateListContext.Provider>
  );
};

// Create a custom hook to use the AccountContext
export const useExpatriateListContext = () => {
  return useContext(ExpatriateListContext);
};

export default ExpatriateListContext;
