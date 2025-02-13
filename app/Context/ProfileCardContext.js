"use client";
import React, { createContext, useContext } from "react";
import useProfileCardData from "../components/home/hooks/useProfileCardData";

// Create the context
const ProfileCardContext = createContext();

// Define a provider component
export const ProfileCardProvider = ({ children }) => {
  const { customer, isLoading, picture_profile } = useProfileCardData();

  return (
    <ProfileCardContext.Provider
      value={{ customer, isLoading, picture_profile }}
    >
      {children}
    </ProfileCardContext.Provider>
  );
};

// Create a custom hook to use the AccountContext
export const useProfileCardContext = () => {
  return useContext(ProfileCardContext);
};

export default ProfileCardContext;
