"use client";
import { motion } from "framer-motion";
import React from "react";

const WebButton = ({
  title = "Submit",
  onClickFunction = () => {},
  className = {},
  def = false,
  styles = {},
  disabled = false,
  bg_color = "#1062FE",
}) => {
  return (
    <motion.button
      onClick={onClickFunction}
      whileTap={!def && !disabled ? { scale: 0.889 } : {}}
      whileHover={
        def && disabled
          ? { opacity: 0.88 }
          : {
              opacity: 1,
              backgroundColor: bg_color,
              color: "#ffffff",
              fontWeight: "300",
            }
      }
      style={styles}
      className={
        !def
          ? `border font-bold px-3 py-2 text-xs rounded-md ${className}`
          : className
      }
      disabled={disabled}
    >
      {title}
    </motion.button>
  );
};

export default WebButton;
