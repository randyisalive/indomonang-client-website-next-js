"use client";
import React, { createContext, useContext } from "react";
import useQuotationsData from "../hooks/useQuotationsData";

// Create the context
const QuotationContext = createContext();

// Define a provider component
export const QuotationProvider = ({ children }) => {
  const {
    quotations,
    download_client_approval,
    pdf,
    upload_client_signature,
    approve_quotation,
    reject_quotation,
  } = useQuotationsData();

  return (
    <QuotationContext.Provider
      value={{
        quotations,
        download_client_approval,
        pdf,
        upload_client_signature,
        approve_quotation,
        reject_quotation,
      }}
    >
      {children}
    </QuotationContext.Provider>
  );
};

// Create a custom hook to use the AccountContext
export const useQuotationContext = () => {
  return useContext(QuotationContext);
};
