"use client";
import React, { createContext, useContext } from "react";
import useHomeCardContainerData from "../(main)/hooks/useHomeCardContainerData";

// Create the context
const HomeCardContainerContext = createContext();

// Define a provider component
export const HomeCardContainerProvider = ({ children }) => {
  const { cardData, isLoading, role, accounts } = useHomeCardContainerData();

  return (
    <HomeCardContainerContext.Provider
      value={{ cardData, isLoading, role, accounts }}
    >
      {children}
    </HomeCardContainerContext.Provider>
  );
};

// Create a custom hook to use the AccountContext
export const useHomeCardContainerContext = () => {
  return useContext(HomeCardContainerContext);
};

export default HomeCardContainerContext;
