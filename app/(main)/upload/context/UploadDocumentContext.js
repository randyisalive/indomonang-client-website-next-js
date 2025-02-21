"use client";
import React, { createContext, useContext } from "react";
import useUploadDocumentData from "../hooks/useUploadDocumentData";

// Create the context
const UploadDocumentContext = createContext();

// Define a provider component
export const UploadDocumentProvider = ({ children }) => {
  const {
    wo,
    woData,
    getWoBtn,
    refForm,
    setRefForm,
    handleForm,
    requiredDocument,
    FilesUploadHandle,
    deleteAttachmentBtn,
    handleDownloadUploadedDocuments,
    toastRef,
    HistoryHooks: { history, getHistoryData },
    UpdateClientData,
  } = useUploadDocumentData();

  return (
    <UploadDocumentContext.Provider
      value={{
        wo,
        woData,
        getWoBtn,
        refForm,
        setRefForm,
        handleForm,
        requiredDocument,
        FilesUploadHandle,
        deleteAttachmentBtn,
        handleDownloadUploadedDocuments,
        toastRef,
        HistoryHooks: { history, getHistoryData },
        UpdateClientData,
      }}
    >
      {children}
    </UploadDocumentContext.Provider>
  );
};

// Create a custom hook to use the AccountContext
export const useUploadDocumentContext = () => {
  return useContext(UploadDocumentContext);
};

export default UploadDocumentContext;
