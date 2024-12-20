"use client";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toast } from "primereact/toast";

const CopyButton = ({ text = "" }) => {
  const [copySuccess, setCopySuccess] = useState("");
  const toastRef = useRef(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess("Copied!");
        toastRef.current.show({
          severity: "success",
          summary: "Success",
          detail: "Text copied to clipboard",
          life: 3000,
        });
      },
      () => {
        setCopySuccess("Failed to copy!");
        toastRef.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to copy text",
          life: 3000,
        });
      }
    );
  };

  return (
    <>
      <Toast ref={toastRef} />
      <motion.i
        whileTap={{ scale: 0.889 }}
        className="pi pi-copy mx-2 cursor-pointer"
        onClick={() => copyToClipboard(text)}
      ></motion.i>
    </>
  );
};

export default CopyButton;
