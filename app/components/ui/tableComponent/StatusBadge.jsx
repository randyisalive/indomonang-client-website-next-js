import React from "react";
import { motion } from "framer-motion";

const StatusBadge = ({
  title = "",
  bg_color = "",
  font_color = "",
  className = "",
}) => {
  return (
    <motion.div
      whileTap={{ scale: 0.889 }}
      className={
        !className
          ? `px-3 py-1 font-bold select-none rounded-xl w-fit shadow-md`
          : `px-3 py-1 font-bold select-none rounded-xl shadow-md ${className}`
      }
      style={{ backgroundColor: bg_color, color: font_color }}
    >
      {title}
    </motion.div>
  );
};

export default StatusBadge;
