import React from "react";
import { motion } from "framer-motion";

const StatusBadge = ({ title = "", bg_color = "", font_color = "" }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.889 }}
      className="px-3 py-1 font-bold select-none rounded-xl w-fit shadow-md"
      style={{ backgroundColor: bg_color, color: font_color }}
    >
      {title}
    </motion.div>
  );
};

export default StatusBadge;
