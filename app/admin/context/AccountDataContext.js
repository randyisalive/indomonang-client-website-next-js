"use client";
import React, { createContext, useContext } from "react";
import useAccountSettingsData from "../account/[profile]/hooks/useAccountSettingsData";
import useAccountsData from "../account/hooks/useAccountData";

// Create the context
const AccountDataContext = createContext();

// Define a provider component
export const AccountDataProvider = ({ children }) => {
  const {
    handleFormAccount,
    accounts,
    handleUploadPhoto,
    UpdateAccountBtn,
    isLoading,
    role,
  } = useAccountsData();

  return (
    <AccountDataContext.Provider
      value={{
        handleFormAccount,
        accounts,
        handleUploadPhoto,
        UpdateAccountBtn,
        isLoading,
        role,
      }}
    >
      {children}
    </AccountDataContext.Provider>
  );
};

// Create a custom hook to use the AccountContext
export const useAccountDataContext = () => {
  return useContext(AccountDataContext);
};

export default AccountDataContext;
