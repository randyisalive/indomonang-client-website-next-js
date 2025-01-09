"use client";
import React, { createContext, useContext } from "react";
import useActiveProductsData from "../(main)/hooks/useActiveProductsData";

// Create the context
const ActiveProductContext = createContext();

// Define a provider component
export const ActiveProductProvider = ({ children }) => {
  const { activeProduct, isLoading, role } = useActiveProductsData();

  return (
    <ActiveProductContext.Provider value={{ activeProduct, isLoading, role }}>
      {children}
    </ActiveProductContext.Provider>
  );
};

// Create a custom hook to use the AccountContext
export const useActiveProductContext = () => {
  return useContext(ActiveProductContext);
};

export default ActiveProductContext;
