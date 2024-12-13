"use client";
import { motion } from "framer-motion";
import React from "react";

const WebButton = ({
  title = "Submit",
  onClickFunction = () => {},
  className = {},
  def = false,
  styles = {},
}) => {
  return (
    <motion.button
      onClick={onClickFunction}
      whileHover={{ opacity: 0.88 }}
      style={styles}
      className={
        !def
          ? `border font-bold px-3 py-2 text-xs rounded-md ${className}`
          : className
      }
    >
      {title}
    </motion.button>
  );
};

export default WebButton;
