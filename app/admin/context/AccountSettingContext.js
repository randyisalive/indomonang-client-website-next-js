"use client";
import React, { createContext, useContext } from "react";
import useAccountSettingsData from "../account/[profile]/hooks/useAccountSettingsData";

// Create the context
const AccountSettingContext = createContext();

// Define a provider component
export const AccountSettingProvider = ({ children }) => {
  const { customer, isLoading } = useAccountSettingsData();

  return (
    <AccountSettingContext.Provider value={{ customer, isLoading }}>
      {children}
    </AccountSettingContext.Provider>
  );
};

// Create a custom hook to use the AccountContext
export const useAccountSettingContext = () => {
  return useContext(AccountSettingContext);
};

export default AccountSettingContext;
