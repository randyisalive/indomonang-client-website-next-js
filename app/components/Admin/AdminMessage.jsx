"use client";
import { Message } from "primereact/message";
import React from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { getLocalStorage } from "@/app/function/getLocalStorage";
import useDecryptionKeyData from "@/app/hooks/useDecryptionKeyData";

const AdminMessage = () => {
  // dec data
  const { role } = useDecryptionKeyData();

  return (
    <>
      {role === "Admin" && (
        <Message
          severity="warn"
          text={`${role} Privilege`}
          className="w-full"
        />
      )}
    </>
  );
};

export default AdminMessage;
