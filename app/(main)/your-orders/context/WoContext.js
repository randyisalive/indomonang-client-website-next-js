"use client";
import React, { createContext, useContext } from "react";
import useWOData from "@/app/hooks/useWOData";

// Create the context
const WoContext = createContext();

// Define a provider component
export const WoProvider = ({ children }) => {
  const { wo, isLoading, handleWODialog, handleRating } = useWOData();

  return (
    <WoContext.Provider value={{ wo, isLoading, handleWODialog, handleRating }}>
      {children}
    </WoContext.Provider>
  );
};

// Create a custom hook to use the AccountContext
export const useWoContext = () => {
  return useContext(WoContext);
};
