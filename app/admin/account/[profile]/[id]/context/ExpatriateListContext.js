"use client";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import React, { createContext, useContext } from "react";
import useExpatriateListData from "../hooks/useExpatriateListData";

// Create the context
const ExpatriateListContext = createContext();

// Define a provider component
export const ExpatriateListProvider = ({ children }) => {
  const { expatriates, expat_notis } = useExpatriateListData();

  return (
    <ExpatriateListContext.Provider
      value={{
        expatriates,
        expat_notis,
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
