"use client";
import React, { createContext, useContext } from "react";
import useTicketListData from "../list/hooks/useTicketListData";

// Create the context
const TicketContext = createContext();

// Define a provider component
export const TicketProvider = ({ children }) => {
  const { tickets } = useTicketListData();

  return (
    <TicketContext.Provider value={{ tickets }}>
      {children}
    </TicketContext.Provider>
  );
};

// Create a custom hook to use the AccountContext
export const useTicketContext = () => {
  return useContext(TicketContext);
};
