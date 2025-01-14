"use client";
import React, { createContext, useContext } from "react";
import useInvoiceData from "../hooks/useInvoiceData";

// Create the context
const InvoiceContext = createContext();

// Define a provider component
export const InvoiceProvider = ({ children }) => {
  const { invoice, handleDownloadInvoice } = useInvoiceData();

  return (
    <InvoiceContext.Provider value={{ invoice, handleDownloadInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};

// Create a custom hook to use the AccountContext
export const useInvoiceContext = () => {
  return useContext(InvoiceContext);
};
