"use client";
import React, { createContext, useContext } from "react";
import useProcessingData from "@/app/hooks/useProcessingData";

// Create the context
const WoDetailContext = createContext();

// Define a provider component
export const WoDetailProvider = ({ children }) => {
  const {
    processing,
    getProcessing,
    download_attachments,
    downloadStatus,
    isLoading,
    processedData,
    filteredCourier,
  } = useProcessingData();
  return (
    <WoDetailContext.Provider
      value={{
        processing,
        getProcessing,
        download_attachments,
        downloadStatus,
        isLoading,
        filteredCourier,
        processedData,
      }}
    >
      {children}
    </WoDetailContext.Provider>
  );
};

// Create a custom hook to use the AccountContext
export const useWoDetailContext = () => {
  return useContext(WoDetailContext);
};
