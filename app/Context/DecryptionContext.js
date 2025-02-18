"use client";
import React, { createContext, useContext } from "react";
import useDecryptionKeyData from "../hooks/useDecryptionKeyData";

// Create the context
const DecryptionContext = createContext();

// Define a provider component
export const DecryptionProvider = ({ children }) => {
  const { decKey } = useDecryptionKeyData();
  return (
    <DecryptionContext.Provider value={{ decKey }}>
      {children}
    </DecryptionContext.Provider>
  );
};

// Create a custom hook to use the AccountContext
export const useDecryptionContext = () => {
  return useContext(DecryptionContext);
};

export default DecryptionContext;
