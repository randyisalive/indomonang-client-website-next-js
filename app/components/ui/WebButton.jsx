"use client";
import { motion } from "framer-motion";
import React from "react";

const WebButton = ({
  title = "Submit",
  onClickFunction = () => {},
  className = {},
}) => {
  return (
    <motion.button
      onClick={onClickFunction}
      whileHover={{ backgroundColor: "#2563eb", color: "#ffffff" }}
      className={`border font-bold px-3 py-2 text-xs rounded-md ${className}`}
    >
      {title}
    </motion.button>
  );
};

export default WebButton;
