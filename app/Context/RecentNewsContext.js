"use client";
import React, { createContext, useContext } from "react";
import useAccountsData from "../admin/account/hooks/useAccountData";
import useRecentNewsData from "../hooks/useRecentNewsData";

// Create the context
const RecentNewsContext = createContext();

// Define a provider component
export const RecentNewsProvider = ({ children }) => {
  const { news } = useRecentNewsData();

  return (
    <RecentNewsContext.Provider value={{ news }}>
      {children}
    </RecentNewsContext.Provider>
  );
};

// Create a custom hook to use the AccountContext
export const useRecentNewsContext = () => {
  return useContext(RecentNewsContext);
};

export default RecentNewsContext;
