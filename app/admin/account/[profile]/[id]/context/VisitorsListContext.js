"use client";
import { useAccountDataContext } from "@/app/admin/context/AccountDataContext";
import React, { createContext, useContext } from "react";
import useVisitorsListData from "../hooks/useVisitorsListData";
import { AccountProvider } from "@/app/Context/AccountContext";

// Create the context
const VisitorsListContext = createContext();

// Define a provider component
export const VisitorsListProvider = ({ children }) => {
  const { visitors, visitors_notis } = useVisitorsListData();

  return (
    <AccountProvider>
      <VisitorsListContext.Provider
        value={{
          visitors,
          visitors_notis,
        }}
      >
        {children}
      </VisitorsListContext.Provider>
    </AccountProvider>
  );
};

// Create a custom hook to use the AccountContext
export const useVisitorsListContext = () => {
  return useContext(VisitorsListContext);
};

export default VisitorsListContext;
