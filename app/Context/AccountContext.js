"use client";
import React, { createContext, useContext } from "react";
import useAccountsData from "../admin/account/hooks/useAccountData";

// Create the context
const AccountContext = createContext();

// Define a provider component
export const AccountProvider = ({ children }) => {
  const { accounts } = useAccountsData();

  return (
    <AccountContext.Provider value={accounts}>
      {children}
    </AccountContext.Provider>
  );
};

// Create a custom hook to use the AccountContext
export const useAccountContext = () => {
  return useContext(AccountContext);
};

export default AccountContext;
