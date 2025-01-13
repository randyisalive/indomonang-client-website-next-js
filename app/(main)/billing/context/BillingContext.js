"use client";
import React, { createContext, useContext } from "react";
import useBillingData from "../hooks/useBillingData";

// Create the context
const BillingContext = createContext();

// Define a provider component
export const BillingProvider = ({ children }) => {
  const { bills, isLoading } = useBillingData();

  return (
    <BillingContext.Provider value={{ bills, isLoading }}>
      {children}
    </BillingContext.Provider>
  );
};

// Create a custom hook to use the AccountContext
export const useBillingContext = () => {
  return useContext(BillingContext);
};
